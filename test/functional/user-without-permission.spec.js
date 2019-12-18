'use strict'

const { test, trait } = use('Test/Suite')('USER - Usuario sem permissão')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')
// trait('DatabaseTransactions')
// o loginVia ta dando treta com essa trait a

test('Usuário sem a permissao de "create_user", não pode cadastrar um novo usuario', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('users')
    .loginVia(user)
    .send({
      name: 'novo usuario',
      email: 'cadastrandonovousuario@cadastra.com',
      password: '123',
      password_confirmation: '123'
    })
    .end()
  response.assertStatus(403)
  assert.equal(response.body.error.name, 'ForbiddenException')
})

test('Usuário sem a permissao de "read_user", não poderá listar todos os usuarios', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('users')
    .loginVia(user)
    .end()

  response.assertStatus(403)
  assert.equal(response.body.error.name, 'ForbiddenException')
})

test('Usuário sem a permissao de "read_one_user", não podera listar detalhes de outros usuarios', async ({
  assert,
  client
}) => {
  const users = await Factory.model('App/Models/User').createMany(2)

  const response = await client
    .get(`users/${users[1].id}`)
    .loginVia(users[0])
    .end()

  response.assertStatus(403)
  assert.equal(response.body.error.name, 'ForbiddenException')
})

test('Usuário sem a permissao de "read_one_user", deve listar os proprios delalhes', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get(`users/${user.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.id, user.id)
})
