'use strict'

const Role = use('Role')

class RoleController {
  async index() {
    const roles = await Role.query()
      .with('permissions')
      .fetch()

    return roles
  }

  async show({ params }) {
    const roles = await Role.findOrFail(params.id)

    await roles.load('permissions')

    return roles
  }

  async store({ request }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions',
    ])
    const role = await Role.create(data)

    if (permissions) {
      await role.permissions().attach(permissions)
    }
    await role.load('permissions')

    return role
  }

  async update({ request, params }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions',
    ])

    const role = await Role.findOrFail(params.id)

    role.merge(data)

    role.save()

    if (permissions) {
      await role.permissions().sync(permissions)
    }
    await role.load('permissions')

    return role
  }

  async destroy({ params }) {
    const role = Role.findOrFail(params.id)

    await role.delete()

    return role
  }
}

module.exports = RoleController
