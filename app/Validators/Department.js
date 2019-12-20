'use strict'

class Department {
  get rules() {
    return {
      // validation rules
      name: 'required'
    }
  }
}

module.exports = Department
