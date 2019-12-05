'use strict'

const { startOfYesterday, endOfYesterday } = require('date-fns')

const Task = use('Task')
const Schedule = use('App/Models/Schedule')

class CheckoutAll extends Task {
  static get schedule () {
    return '0 */1 * * * *' // a cada 1 minuto
    // return '* 0 * * *' // todos os dias ha meia noite
  }

  async handle () {
    const schedule = await Schedule
      .query()
      .whereBetween('date_schedule', [startOfYesterday(), endOfYesterday()])
      .whereNull('date_checkout')
      .update({ date_checkout: new Date() })

    console.log(new Date())
    this.info(schedule)
  }
}

module.exports = CheckoutAll
