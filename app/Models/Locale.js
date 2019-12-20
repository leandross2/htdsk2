'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Locale extends Model {
  desks() {
    return this.hasMany('App/Models/Desk')
  }
}

module.exports = Locale
