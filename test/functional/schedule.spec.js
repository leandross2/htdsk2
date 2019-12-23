'use strict'

const { test, trait } = use('Test/Suite')('SCHEDULE - usuario com permissão')
const Permission = use('Permission')
const Factory = use('Factory')
const Schedule = use('App/Models/Schedule')

const { startOfYesterday, startOfTomorrow, subHours } = require('date-fns')

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

test('Deve ser possivel fazer um agendamento a qualquer momento para o dia de de hoje ', async ({
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

  const user = await Factory.model('App/Models/User').create()

  const permission = await Permission.query()
    .where('slug', 'create_schedules')
    .first()

  await user.permissions().attach(permission.id)

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      dateSchedule: new Date(),
      userId: user.id,
      deskId: desk.id,
    })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.id)
})

test('deve ser possivel um usuário com permissão de "create_for_others_schedules" e "create_schedules" fazer checkin/agendamento para outro usuario', async ({
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
      dateSchedule: new Date(),
      userId: users[1].id,
      deskId: desk.id,
    })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.id)
})

test(
  'deve ser possivel fazer um agendamento com até 9 horas de antecedencia do dia seguinte'
)

test('Não deve poder fazer checkin em uma mesa, sem fazer checkout da sua mesa atual', async ({
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

  const user = await Factory.model('App/Models/User').create()

  const permission = await Permission.query()
    .where('slug', 'create_schedules')
    .first()

  await user.permissions().attach(permission.id)

  await client
    .post('/schedules')
    .loginVia(user)
    .send({
      dateSchedule: new Date(),
      user_id: user.id,
      desk_id: desk[0].id,
    })
    .end()
  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      dateSchedule: new Date(),
      user_id: user.id,
      desk_id: desk[1].id,
    })
    .end()
  response.assertStatus(400)
  assert.equal(response.body[0].field, 'dateSchedule')
})

test('Não deve poder fazer checkin em uma mesa que não existe', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Permission.query()
    .where('slug', 'create_schedules')
    .first()

  await user.permissions().attach(permission.id)

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      dateSchedule: new Date(),
      userId: user.id,
      deskId: 123,
    })
    .end()

  response.assertStatus(400)
})

test('Não deve poder fazer checkin em uma data passada', async ({
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

  const user = await Factory.model('App/Models/User').create()

  const permission = await Permission.query()
    .where('slug', 'create_schedules')
    .first()

  await user.permissions().attach(permission.id)

  const yesterday = startOfYesterday()

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      dateSchedule: yesterday,
      userId: user.id,
      deskId: desk.id,
    })
    .end()

  assert.equal(response.status, 401)
})

test('Não deve ser possivel fazer um agendamento com mais de 9 horas de antecedencia do dia seguinte', async ({
  assert,
  client,
}) => {
  const user = await createUserWithPermission(
    'create_schedules',
    'create_users'
  )

  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: '20|20',
      locale_id: 1,
    },
  ])

  const schedule = await Schedule.create({
    date_schedule: startOfTomorrow(),
    user_id: user.id,
    desk_id: desk.id,
  })
  console.log(user.id)
  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: subHours(startOfTomorrow(), 10),
      user_id: user.id,
      desk_id: desk.id,
    })
  console.log(response)
})
