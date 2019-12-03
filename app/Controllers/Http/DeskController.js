'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Desk = use('App/Models/Desk')
/**
 * Resourceful controller for interacting with desks
 */
class DeskController {
  /**
   * Show a list of all desks.
   * GET desks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const desks = await Desk.all()

    return desks
  }

  /**
   * Create/save a new desk.
   * POST desks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['description', 'position'])

    const desk = await Desk.create(data)

    return desk
  }

  /**
   * Display a single desk.
   * GET desks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const desk = await Desk.query()
      .where('id', params.id)
      .with('locale')
      .fetch()

    return desk
  }

  /**
   * Delete a desk with id.
   * DELETE desks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const desk = await Desk.find(params.id)

    await desk.delete()
  }
}

module.exports = DeskController
