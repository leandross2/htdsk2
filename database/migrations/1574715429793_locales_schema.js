'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocalesSchema extends Schema {
  up () {
    this.create('locales', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('locales')
  }
}

module.exports = LocalesSchema
