'use strict'

const { test, trait } = use('Test/Suite')('Sessão')

const User = use('App/Models/User')

trait('Test/ApiClient')

test('Deve retornar um token JWT ao criar uma nova sessao', async ({
  assert,
  client
}) => {
  // await ace.call('route:list', {}, { silent: true })
  await User.create({
    name: 'adminsitrador',
    email: 'admin@cadastra.com',
    password: '123'
  })

  const response = await client
    .post('/session')
    .send({
      email: 'admin@cadastra.com',
      password: '123'
    })
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
      password: '123'
    })
    .end()
  response.assertStatus(401)
  assert.equal(response.body.error.name, 'UserNotFoundException')
})
