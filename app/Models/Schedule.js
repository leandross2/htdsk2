'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  desk () {
    return this.belongsTo('App/Models/Desk')
  }
}

module.exports = Schedule
