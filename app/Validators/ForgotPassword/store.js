'use strict'

class ForgotPasswordStore {
  get rules() {
    return {
      email: "required|email"
    }
  }
}

module.exports = ForgotPasswordStore
