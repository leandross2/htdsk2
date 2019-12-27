'use strict'

const User = use('App/Models/User')

class UserController {
  /**
   * @swagger
   * /api/hello:
   *   get:
   *     tags:
   *       - Test
   *     summary: Sample API
   *     parameters:
   *       - name: name
   *         description: Name of the user
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async store({ request, response }) {
    const { permissions, roles, ...data } = request.only([
      'name',
      'email',
      'password',
      'department_id',
      'permissions',
      'roles',
    ])

    const user = await User.create(data)

    if (roles) {
      await user.roles().attach(roles)
    }
    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return response.status(201).send(user)
  }

  async index() {
    const users = await User.all()
    return users
  }

  async update({ params, request, auth }) {
    const { id } = params
    const {
      permissions,
      roles,
      name,
      email,
      password,
      department_id,
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
      department_id,
    })

    await user.save()

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async show({ params, response, auth }) {
    const userLogged = auth.user
    const isAdmin = await userLogged.getRoles('')
    const havePermisssion = await userLogged.getPermissions()

    if (
      !isAdmin.includes('administrator') &&
      !havePermisssion.includes('read_one_users') &&
      userLogged.id !== Number(params.id)
    ) {
      return response.status(403).send({
        error: {
          message: 'Você não tem permissao para ver este usuario',
          name: 'ForbiddenException',
        },
      })
    }

    const user = await User.findOrFail(params.id)

    const loggedUser = await auth.getUser()

    if (params.id === loggedUser.id || loggedUser.is('administrator')) {
      user.type = await user.getRoles()
      user.permissions = await user.getPermissions()
    }

    return response.status(200).send(user)
  }

  async destroy({ params }) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}

module.exports = UserController
