'use strict'

class DeskStore {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      // validation rules
      description: 'required',
      position: 'required'
    }
  }
}

module.exports = DeskStore
