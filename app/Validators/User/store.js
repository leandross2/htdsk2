'use strict'

class UserStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      department_id: 'exists:departments,id'
    }
  }
}

module.exports = UserStore
