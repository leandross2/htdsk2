'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddLocalesToDesksSchema extends Schema {
  up () {
    this.alter('desks', (table) => {
      table
        .integer('locale_id')
        .unsigned()
        .references('id')
        .inTable('locales')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('desks', (table) => {
      table.dropColumn('locale_id')
    })
  }
}

module.exports = AddLocalesToDesksSchema
