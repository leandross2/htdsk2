'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const {
  startOfDay,
  endOfDay,
  parseISO,
  startOfToday,
  isBefore,
} = require('date-fns')
// const { utcToZonedTime } = require('date-fns-tz')

const Schedule = use('App/Models/Schedule')
/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { dateSchedule, userId: user_id, deskId: desk_id } = request.all()

    const startDaySchedule = startOfDay(parseISO(dateSchedule))
    const invalidDate = isBefore(startDaySchedule, startOfToday())
    if (invalidDate) {
      return response
        .status(401)
        .send({ error: { message: 'Esta data já passou' } })
    }

    const { user: userLogged } = auth

    const permissions = await userLogged.getPermissions()

    if (!permissions.includes('create_schedules') && !permissions.includes('create_for_others_schedules')) {
      return response.status(403).send({ error: { message: 'Você não tem permissão' } })
    }
    // console.log(utcToZonedTime(startDaySchedule, 'America/Bahia'))
    const schedule = await Schedule.create({
      date_schedule: startDaySchedule,
      user_id,
      desk_id,
    })

    return response.status(201).send(schedule)
  }

  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params, request, response, view
  }) {
    const { id } = params

    const schedules = await Schedule.query()
      .where('id', id)
      .with('user')
      .with('desk')
      .fetch()

    return schedules
  }

  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ response, auth }) {
    const { user } = auth

    const schedule = await Schedule.findByOrFail('user_id', user.id)

    schedule.date_checkout = new Date()

    await schedule.save()
  }
}

module.exports = ScheduleController
