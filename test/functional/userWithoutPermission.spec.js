'use strict'

const { test, trait } = use('Test/Suite')('Usuario sem permissão')
const User = use('App/Models/User')

// const ace = require('@adonisjs/ace')

trait('Test/ApiClient')

test('Usuário sem a permissao de "create_user", não pode cadastrar um novo usuario', async ({
  assert,
  client
}) => {
  await User.create({
    name: 'usuario',
    email: 'user@cadastra.com',
    password: '123'
  })
  const session = await client
    .post('/session')
    .send({
      email: 'admin@cadastra.com',
      password: '123'
    })
    .end()

  const { token } = session.body.user

  const response = await client
    .post('/users')
    .send({
      name: 'novo usuario',
      email: 'newuser@cadastra.com',
      password: '123',
      password_confirmation: '123'
    })
    .header('Authorization', `Bearer ${token}`)
    .end()

  response.assertStatus(403)
  assert.equal(response.body.error.name, 'ForbiddenException')
})
test('Usuário sem a permissao de "read_user", listar todos os usuarios', async ({
  assert,
  client
}) => {})
