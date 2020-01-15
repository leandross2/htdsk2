'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { startOfDay, endOfDay, parseISO } = require('date-fns')
// const { utcToZonedTime } = require('date-fns-tz')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Schedule = use('App/Models/Schedule')

class ScheduleController {
  async index({ request }) {
    const { date } = request.get()

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
      userLogged.id !== user_id &&
      !permissions.includes('create_for_others_schedules')
    ) {
      return response.status(403).send({
        error: {
          message: 'Você não tem permissão',
          name: 'ForbiddenException',
          status: 403,
        },
      })
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
      .first()

    return schedules
  }

  async update({ params, request }) {
    const { date_schedule, date_checkout, user_id, desk_id } = request.all()

    const schedule = await Schedule.find(params.id)

    schedule.merge({
      date_schedule,
      date_checkout,
      user_id,
      desk_id,
    })

    await schedule.save()
  }

  async destroy({ params }) {
    const schedule = await Schedule.find(params.id)
    await schedule.delete()
  }
}

module.exports = ScheduleController
