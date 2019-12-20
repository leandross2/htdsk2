'use strict'

const { startOfDay, endOfDay, parseISO } = require('date-fns')

const Schedule = use('App/Models/Schedule')

class CheckoutController {
  async index({ request, query }) {
    const { date } = request.get()

    const parsedDate = parseISO(date)

    const schedules = await Schedule.query()
      .whereBetween('date_schedule', [
        startOfDay(parsedDate),
        endOfDay(parsedDate)
      ])
      .whereNotNull('date_checkout')
      .fetch()

    return schedules
  }

  async update({ request, params }) {
    const schedule = await Schedule.findOrFail(params.id)
    console.log(schedule)
    schedule.date_checkout = new Date()

    await schedule.save()
  }
}

module.exports = CheckoutController
