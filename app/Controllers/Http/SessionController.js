'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await User.query().where('email', email).first()
    const roles = await user.getRoles()
    const permissions = await user.getPermissions()
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department_id: user.department_id,
        roles
      }
    }
  }
}

module.exports = SessionController
