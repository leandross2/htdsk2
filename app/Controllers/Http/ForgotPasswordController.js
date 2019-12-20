'use strict'

const crypto = require('crypto')
const { subHours, isAfter, parseISO } = require('date-fns')

const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(24).toString('hex')

      user.token_created_at = new Date()

      await user.save()

      return await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        (message) => {
          message
            .to(user.email)
            .from('no-reply@cadatra.com')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Usuário não encontrado' } })
    }
  }

  async update({ request, response }) {
    const { token, password } = request.all()
    const user = await User.findByOrFail('token', token)
    try {
      const date = parseISO(new Date())
      const dateSub = subHours(date, 1)
      const tokenExpired = isAfter(dateSub, user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Token expirado' } })
      }

      user.password = password
      user.token = null
      user.token_created_at = null

      // user.merge(newData)

      await user.save()
      return response.status(200)
    } catch (err) {
      console.log(user, err)
      return response.status(401).send({ error: { message: 'Token inválido' } })
    }
  }
}

module.exports = ForgotPasswordController
