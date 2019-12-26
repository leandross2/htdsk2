'use strict'

const { test, trait } = use('Test/Suite')('SCHEDULE - usuario sem permissão')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

test('Não deve ser possivel um usuário sem permissão de "create_schedules" fazer checkin/agendamento para outro usuario', async ({
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

  const response = await client
    .post('/schedules')
    .loginVia(users[0])
    .send({
      dateSchedule: new Date(),
      userId: users[1].id,
      deskId: desk.id,
    })
    .end()

  response.assertStatus(400)
})
