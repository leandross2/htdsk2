'use strict'

const { test, trait } = use('Test/Suite')('SCHEDULE - usuario com permissão')
const Permission = use('Permission')
const Factory = use('Factory')

const {
  startOfYesterday,
  startOfTomorrow,
  subHours,
  isBefore,
  parse,
} = require('date-fns')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

async function createUserWithPermission(...setPermissions) {
  const user = await Factory.model('App/Models/User').create()

  const permissions = await Promise.all(
    setPermissions.map(async setPermission =>
      Permission.query()
        .where('slug', setPermission)
        .first()
    )
  )
  await Promise.all(
    permissions.map(async permission =>
      user.permissions().attach(permission.id)
    )
  )
  await user.reload()

  return user
}

test('STORE: Deve ser possivel fazer um agendamento a qualquer momento para o dia de de hoje ', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('create_schedules')

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: new Date(),
      user_id: user.id,
      desk_id: desk.id,
    })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.id)
})

test('STORE: deve ser possivel um usuário com permissão de "create_for_others_schedules" e "create_schedules" fazer checkin/agendamento para outro usuario', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const users = await Factory.model('App/Models/User').createMany(2)
  const permissions = []

  permissions[0] = await Permission.query()
    .where('slug', 'create_for_others_schedules')
    .first()
  permissions[1] = await Permission.query()
    .where('slug', 'create_schedules')
    .first()

  await users[0]
    .permissions()
    .attach(permissions.map(permission => permission.id))

  const response = await client
    .post('/schedules')
    .loginVia(users[0])
    .send({
      date_schedule: new Date(),
      user_id: users[1].id,
      desk_id: desk.id,
    })
    .end()
  response.assertStatus(201)
  assert.exists(response.body.id)
})

test('STORE: deve ser possivel fazer um agendamento para o dia seguinte, somente após as 15H de hoje', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('create_schedules')

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: startOfTomorrow(),
      user_id: user.id,
      desk_id: desk.id,
    })
    .end()

  const subTomorrow = subHours(startOfTomorrow(), 9)

  if (isBefore(new Date(), subTomorrow)) {
    response.assertStatus(400)
  } else {
    response.assertStatus(201)
    assert.exists(response.body.id)
  }
})

test('STORE: Não deve poder fazer checkin em uma mesa, sem fazer checkout da sua mesa atual', async ({
  assert,
  client,
}) => {
  const desk = await Factory.model('App/Models/Desk').createMany(2, [
    {
      description: 'A1',
      position: '20 | 20',
      locale_id: 1,
    },
    {
      description: 'A2',
      position: '40 | 40',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('create_schedules')

  await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: new Date(),
      user_id: user.id,
      desk_id: desk[0].id,
    })
    .end()
  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: new Date(),
      user_id: user.id,
      desk_id: desk[1].id,
    })
    .end()

  response.assertStatus(400)
  assert.equal(response.body[0].field, 'date_schedule')
})

test('STORE: Não deve poder fazer checkin em uma mesa que não existe', async ({
  client,
}) => {
  const user = await createUserWithPermission('create_schedules')

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: new Date(),
      user_id: user.id,
      desk_id: 123,
    })
    .end()

  response.assertStatus(400)
})

test('STORE: Não deve poder fazer checkin em uma data passada', async ({
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('create_schedules')

  const yesterday = startOfYesterday()

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: yesterday,
      user_id: user.id,
      desk_id: desk.id,
    })
    .end()

  response.assertStatus(400)
})

test('STORE: formato de data invalido', async ({ assert, client }) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('create_schedules')

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: 'abc',
      user_id: user.id,
      desk_id: desk.id,
    })
    .end()
  response.assertStatus(400)
  assert.equal(response.body[0].validation, 'date')
})

test('INDEX: deve retornar todo os agendamentos de uma data especifica', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission(
    'create_schedules',
    'read_schedules'
  )
  await Factory.model('App/Models/Schedule').create({
    date_schedule: new Date(),
    user_id: user.id,
    desk_id: desk.id,
  })
  await Factory.model('App/Models/Schedule').create({
    date_schedule: new Date(),
    user_id: user.id,
    desk_id: desk.id,
  })

  const response = await client
    .get(
      `/schedules?date=${new Date().getFullYear()}-${`0${new Date().getMonth() +
        1}`.slice(-2)}-${new Date().getDate()}`
    )
    .loginVia(user)
    .end()
  assert.isArray(response.body)
  assert.lengthOf(response.body, 2)
})

test('SHOW: deve exibir um agendamento selecionado por ID', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('read_schedules')

  const schedule = await Factory.model('App/Models/Schedule').create({
    date_schedule: new Date(),
    user_id: user.id,
    desk_id: desk.id,
  })

  const response = await client
    .get(`/schedules/${schedule.id}`)
    .loginVia(user)
    .end()

  assert.exists(response.body.id)
})
test('DESTROY: deve fazer o checkout selecionando um agendamento por ID', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('delete_schedules')

  const schedule = await Factory.model('App/Models/Schedule').create({
    date_schedule: new Date(),
    user_id: user.id,
    desk_id: desk.id,
  })

  const response = await client
    .delete(`/schedules/${schedule.id}`)
    .loginVia(user)
    .end()
  response.assertStatus(204)
})

test('UPDATE: deve ser possivel alterar os dados de um agendamento', async ({
  assert,
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission('update_schedules')

  const schedule = await Factory.model('App/Models/Schedule').create({
    date_schedule: '2020-01-15',
    user_id: user.id,
    desk_id: desk.id,
  })

  const response = await client
    .put(`/schedules/${schedule.id}`)
    .loginVia(user)
    .send({
      date_schedule: '2020-01-16',
      user_id: user.id,
      desk_id: desk.id,
    })
    .end()

  response.assertStatus(204)
})
