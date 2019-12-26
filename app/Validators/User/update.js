'use strict'

const Antl = use('Antl')
class UserUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    const userId = this.ctx.params.id
    return {
      // validation rules

      email: 'email|unique:users',
      password: 'confirmed|min:4',
      department_id: 'exists:departments,id',
      oldPassword: `oldPassword:${userId}`,
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
