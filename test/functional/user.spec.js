'use strict'

const { test, trait } = use('Test/Suite')('USER - Usuario com permisão')
const Factory = use('Factory')
const Permission = use('Permission')
const Role = use('Role')
const Database = use('Database')

// const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')
// trait('DatabaseTransactions')

test('STORE: Usuário com a permissao de "create_users", podera cadastrar um novo usuario', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()

  await user.roles().attach([1])

  const response = await client
    .post('users')
    .loginVia(user)
    .send({
      name: 'novo usuario',
      email: 'newuser@cadastra.com',
      password: '123',
      password_confirmation: '123',
    })
    .end()
  response.assertStatus(201)
  assert.exists(response.body.id)
})

test('STORE: Usuário com a papel "administrator", podera cadastrar um novo usuario com "papel" e "permissão"', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()

  await user.roles().attach([1])

  const response = await client
    .post('users')
    .loginVia(user)
    .send({
      name: 'novo usuario',
      email: 'usuariotest@cadastra.com',
      password: '123',
      password_confirmation: '123',
      roles: [1],
      permissions: [1, 2, 3, 4],
    })
    .end()

  response.assertStatus(201)
  assert.equal(response.body.roles[0].id, 1)
  assert.lengthOf(response.body.roles, 1)
  assert.equal(response.body.permissions[0].id, 1)
  assert.lengthOf(response.body.permissions, 4)
})

test('INDEX: Usuário com a permissao de "read_users", poderá listar todos os usuarios', async ({
  client,
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

test('SHOW: Usuário com a permissao de "read_one_user", poderá listar detalhes de outros usuarios', async ({
  assert,
  client,
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
