'use strict'

const Antl = use('Antl')
class ForgotPasswordStore {
  get rules() {
    return {
      email: 'required|email',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = ForgotPasswordStore
