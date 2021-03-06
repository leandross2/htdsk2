'use strict'

const User = use('App/Models/User')
// const Token = use('App/Models/Token')

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all()

    let expiresIn = null
    if (email === 'mapa@htdsk.com') {
      expiresIn = { expiresIn: '2h' }
    }
    const token = await auth.attempt(email, password, null, expiresIn)

    const user = await User.query()
      .where('email', email)
      .first()

    const roles = await user.getRoles()

    if (roles.includes('administrator')) {
      user.permissions = await user.getPermissions()
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token.token,
        type: roles,
        admin: roles.includes('administrator'),
      },
    }
  }
}

module.exports = SessionController
