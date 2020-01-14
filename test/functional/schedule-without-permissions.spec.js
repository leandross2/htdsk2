'use strict'

const { test, trait } = use('Test/Suite')('SCHEDULE - usuario sem permissão')
const Factory = use('Factory')
const Permission = use('Permission')

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

test('STORE: Não deve ser possivel um usuário sem permissão de "create_schedules" fazer checkin/agendamento', async ({
  client,
}) => {
  const [desk] = await Factory.model('App/Models/Desk').createMany(1, [
    {
      description: 'A1',
      position: 'ali',
      locale_id: 1,
    },
  ])

  const user = await createUserWithPermission()

  const response = await client
    .post('/schedules')
    .loginVia(user)
    .send({
      date_schedule: new Date(),
      user_id: user.id,
      desk_id: desk.id,
    })
    .end()
  response.assertStatus(403)
})

test('STORE: Não deve ser possivel um usuário sem permissão de "create_for_others_schedules" fazer checkin/agendamento para outro usuario', async ({
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
    .where('slug', 'create_schedules')
    .first()

  await users[0].permissions().attach(permissions[0].id)

  const response = await client
    .post('/schedules')
    .loginVia(users[0])
    .send({
      date_schedule: new Date(),
      user_id: users[1].id,
      desk_id: desk.id,
    })
    .end()

  response.assertStatus(403)
})

test('INDEX: Não deve ser possivel um usuário sem permissão de "read_schedules" deve retornar todo os agendamentos de uma data especifica', async ({
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

  const user = await createUserWithPermission()
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

  response.assertStatus(403)
  assert.equal(response.body.error.name, 'ForbiddenException')
})
