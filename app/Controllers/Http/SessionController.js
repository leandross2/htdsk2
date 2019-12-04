'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()

    let expiresIn = null
    if (email === 'mapa@cadastra.com') {
      expiresIn = { expiresIn: '2h' }
    }

    const token = await auth.attempt(email, password, null, expiresIn)

    const user = await User.query().where('email', email).first()
    const roles = await user.getRoles()
    if (roles.includes('administrator')) {
      user.permissions = await user.getPermissions()
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department_id: user.department_id,
        token: token.token,
        type: roles
      }
    }
  }
}

module.exports = SessionController
