'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Desk extends Model {
  static get computed () {
    return ['busy']
  }

  getBusy ({ user_id }) {
    return !!user_id
  }

  // relacionamento entre Desk e User
  user () {
    return this.belongsTo('App/Models/User')
  }

  locale () {
    return this.belongsTo('App/Models/Locale')
  }
}

module.exports = Desk
