'use strict'

const { test, trait } = use('Test/Suite')('USER - Usuario com permisão')
const Factory = use('Factory')
const Permission = use('Permission')

// const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')
// trait('DatabaseTransactions')

test('Usuário com a permissao de "create_users", podera cadastrar um novo usuario', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Permission.query()
    .where('slug', 'create_users')
    .first()

  await user.permissions().attach(permission.id)

  const response = await client
    .post('users')
    .loginVia(user)
    .send({
      name: 'novo usuario',
      email: 'newuser@cadastra.com',
      password: '123',
      password_confirmation: '123'
    })
    .end()

  response.assertStatus(201)
  assert.exists(response.body.id)
})

test('Usuário com a permissao de "read_users", poderá listar todos os usuarios', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Permission.query()
    .where('slug', 'read_users')
    .first()

  await user.permissions().attach(permission.id)

  const response = await client
    .get('users')
    .loginVia(user)
    .end()

  response.assertStatus(200)
})

test('Usuário com a permissao de "read_one_user", poderá listar detalhes de outros usuarios', async ({
  assert,
  client
}) => {
  const users = await Factory.model('App/Models/User').createMany(2)

  const permission = await Permission.query()
    .where('slug', 'read_one_users')
    .first()
  const [userLogin, findUser] = users

  await userLogin.permissions().attach(permission.id)

  const response = await client
    .get(`users/${findUser.id}`)
    .loginVia(userLogin)
    .end()
  response.assertStatus(200)
  assert.exists(response.body.id)
})
