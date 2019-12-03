'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DesksSchema extends Schema {
  up () {
    this.create('desks', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.string('position').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('desks')
  }
}

module.exports = DesksSchema
