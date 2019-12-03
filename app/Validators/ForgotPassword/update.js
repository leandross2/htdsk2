'use strict'

class ForgotPasswordUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      token: 'required|minLength:20',
      password: 'required|email'
    }
  }
}

module.exports = ForgotPasswordUpdate
