'use strict'

const Mail = use('Mail')
const { test, trait } = use('Test/Suite')('Esqueci minha senha')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

trait('Test/ApiClient')
// trait('DatabaseTransactions')

test('Deve enviar um email com as instruções para resetar a senha', async ({
  assert,
  client
}) => {
  Mail.fake()

  const findUser = {
    email: 'email@cadastra.com',
    redirect_url: 'local.com.br'
  }

  await Factory.model('App/Models/User').create({ email: findUser.email })

  const response = await client
    .post('/forgotpassword')
    .send(findUser)
    .end()

  const { token } = User.query()
    .where('email', findUser.email)
    .first()

  response.assertStatus(200)
  assert.isNotNull(token)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, findUser.email)
  Mail.restore()
})
