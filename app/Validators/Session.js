'use strict'

class Session {
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
