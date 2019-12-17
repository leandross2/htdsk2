'use strict'

const { test, trait } = use('Test/Suite')('SESSION - Sessão')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve retornar um token JWT ao criar uma nova sessao', async ({
  assert,
  client
}) => {
  const loginUser = {
    email: 'umemaildetestquenaoexiste@cadastra.com',
    password: '1234'
  }

  await Factory.model('App/Models/User').create(loginUser)

  const response = await client
    .post('/session')
    .send(loginUser)
    .end()

  response.assertStatus(200)

  assert.exists(response.body.user.token)
})

test('Usuário não cadastrado não deve poder fazer login', async ({
  assert,
  client
}) => {
  const response = await client
    .post('/session')
    .send({
      email: 'usuarionaocadastrado@cadastra.com',
      password: '12345'
    })
    .end()

  response.assertStatus(401)
  assert.equal(response.body.error.name, 'UserNotFoundException')
})
