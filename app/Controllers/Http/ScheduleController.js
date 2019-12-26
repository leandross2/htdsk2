'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { startOfDay, endOfDay, parseISO } = require('date-fns')
// const { utcToZonedTime } = require('date-fns-tz')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Schedule = use('App/Models/Schedule')

class ScheduleController {
  async index({ request, response }) {
    const { date } = request.get()
    if (!date || parseISO(date) == 'Invalid Date') {
      return response.status(400).send({ error: { message: 'data invalida' } })
    }

    const parsedDate = parseISO(date)

    const schedules = await Schedule.query()
      .whereBetween('date_schedule', [
        startOfDay(parsedDate),
        endOfDay(parsedDate),
      ])
      .fetch()

    return schedules
  }

  async store({ request, response, auth }) {
    const { date_schedule, user_id, desk_id } = request.all()
    const startDaySchedule = startOfDay(parseISO(date_schedule))

    const { user: userLogged } = auth

    const permissions = await userLogged.getPermissions()

    if (
      !permissions.includes('create_schedules') &&
      !permissions.includes('create_for_others_schedules')
    ) {
      return response
        .status(403)
        .send({ error: { message: 'Você não tem permissão ' } })
    }

    const schedule = await Schedule.create({
      date_schedule: startDaySchedule,
      user_id,
      desk_id,
    })

    return response.status(201).send(schedule)
  }

  async show({ params }) {
    const { id } = params

    const schedules = await Schedule.query()
      .where('id', id)
      .with('user')
      .with('desk')
      .fetch()

    return schedules
  }

  async update({ params, request }) {
    const {
      dateSchedule: date_schedule,
      dateCheckout: date_checkout,
      userId: user_id,
      deskId: desk_id,
    } = request.all()

    const schedule = await Schedule.find(params.id)

    schedule.merge({
      date_schedule,
      date_checkout,
      user_id,
      desk_id,
    })

    await schedule.save()

    return schedule
  }

  async destroy({ auth }) {
    const { user } = auth

    const schedule = await Schedule.findByOrFail('user_id', user.id)

    schedule.date_checkout = new Date()

    await schedule.save()
  }
}

module.exports = ScheduleController
