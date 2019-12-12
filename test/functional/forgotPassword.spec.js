'use strict'

const Mail = use('Mail')
const { test, trait } = use('Test/Suite')('Esqueci minha senha')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve enviar um email com as instruções para resetar a senha', async ({
  assert,
  client
}) => {
  Mail.fake()

  const user = {
    email: 'email@cadastra.com',
    redirect_url: 'local.com.br'
  }

  await Factory.model('App/Models/User').create({ email: user.email })

  const response = await client
    .post('/forgotpassword')
    .send(user)
    .end()

  response.assertStatus(200)

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, user.email)
  Mail.restore()
})
