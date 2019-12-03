'use strict'

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.id
    return {
      // validation rules

      email: 'email|unique:users',
      password: 'confirmed',
      department_id: 'exists:departments,id',
      oldPassword: `oldPassword:${userId}`
    }
  }
}

module.exports = UserUpdate
