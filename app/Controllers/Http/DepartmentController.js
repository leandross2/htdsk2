'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Department = use('App/Models/Department')
/**
 * Resourceful controller for interacting with departments
 */
class DepartmentController {
  /**
   * Show a list of all departments.
   * GET departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const departments = Department.all()
    return departments
  }

  /**
   * Create/save a new department.
   * POST departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const { name } = request.only('name')

    const department = await Department.create({ name })

    return department
  }

  /**
   * Update department details.
   * PUT or PATCH departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const { id } = params
    const { name } = request.only('name')

    const department = await Department.findOrFail(id)
    department.name = name

    await department.save()

    return department
  }

  /**
   * Delete a department with id.
   * DELETE departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const { id } = params

    const department = await Department.findOrFail(id)
    await department.delete()
  }
}

module.exports = DepartmentController
