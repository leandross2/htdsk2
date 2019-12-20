'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Desk extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  locale() {
    return this.belongsTo('App/Models/Locale')
  }
}

module.exports = Desk
