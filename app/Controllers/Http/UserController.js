'use strict'

const User = use('App/Models/User')
const Department = use('App/Models/Department')

class UserController {
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'name',
      'email',
      'password',
      'department_id',
      'permissions',
      'roles'
    ])

    if (data.department_id) {
      await Department.findOrFail(data.department_id)
    }
    const user = await User.create(data)

    if (roles) {
      await user.roles().attach(roles)
    }
    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async index () {
    const users = User.all()
    return users
  }

  async update ({ params, request, auth }) {
    const { id } = params
    const {
      permissions,
      roles,
      name,
      email,
      password,
      department_id
    } = request.all()

    const user = await User.findOrFail(id)

    const authUser = await auth.getUser()
    const userIsAdministrator = await authUser.is('administrator')

    if (userIsAdministrator && roles) {
      await user.roles().sync(roles)
    }

    if (userIsAdministrator && permissions) {
      await user.permissions().sync(permissions)
    }

    user.merge({
      name,
      email,
      password,
      department_id
    })

    await user.save()

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async show ({ params, auth }) {
    const user = await User.findOrFail(params.id)

    const loggedUser = await auth.getUser()

    if (params.id === loggedUser.id || loggedUser.is('administrator')) {
      user.type = await loggedUser.getRoles()
      user.permissions = await loggedUser.getRoles()
    }
    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}

module.exports = UserController
