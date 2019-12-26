'use strict'

const Antl = use('Antl')

class DeskStore {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      // validation rules
      description: 'required',
      position: 'required',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = DeskStore
