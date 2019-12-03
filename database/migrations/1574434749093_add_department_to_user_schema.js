'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDepartmentToUserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('department_id')
    })
  }
}

module.exports = AddDepartmentToUserSchema
