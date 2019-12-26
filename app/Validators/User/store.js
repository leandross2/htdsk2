'use strict'

const Antl = use('Antl')
class UserStore {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      // validation rules
      name: 'required|min:4',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      department_id: 'exists:departments,id',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = UserStore
