'use strict'

const Antl = use('Antl')
class Department {
  get rules() {
    return {
      // validation rules
      name: 'required',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Department
