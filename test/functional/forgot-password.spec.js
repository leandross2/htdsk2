'use strict'

const { test, trait, beforeEach, afterEach } = use('Test/Suite')(
  'FORGOT PASSWORD - Esqueci minha senha'
)

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Mail = use('Mail')
const { subHours } = require('date-fns')

const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')

beforeEach(() => {
  Mail.fake()
})
afterEach(() => {
  Mail.fake()
})
async function generateTokenResetPassword(email, redirect_url, client) {
  await Factory.model('App/Models/User').create({ email })

  await client
    .post('/forgotpassword')
    .send({ email, redirect_url })
    .end()

  const user = await User.query()
    .where('email', email)
    .first()

  return user
}

test('Deve enviar um email com as instruções para resetar a senha', async ({
  assert,
  client,
}) => {
  const findUser = {
    email: 'email@cadastra.com',
    redirect_url: 'local.com.br',
  }
  const { token } = await generateTokenResetPassword(
    findUser.email,
    findUser.redirect_url,
    client
  )

  assert.isNotNull(token)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, findUser.email)
})

test.skip('Deve poder a resetar a senha, após receber o email com o token para alterar a senha', async ({
  assert,
  client,
}) => {
  const findUser = {
    email: 'email@cadastra.com',
    redirect_url: 'local.com.br',
  }

  const { token } = await generateTokenResetPassword(
    findUser.email,
    findUser.redirect_url,
    client
  )
  const response = await client
    .put('/forgotpassword')
    .send({
      password: 111,
      password_confirmation: 111,
      token,
    })
    .end()
  response.assertStatus(200)
  assert.isNotNull(token)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, findUser.email)
})
