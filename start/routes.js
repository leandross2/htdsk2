'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get('/', () => ({ sucesso: true }))
/**
 * @swagger
 * /greeting:
 *   get:
 *     summary: 인사하기
 *     responses:
 *       200:
 *         description: 인사말
 *         schema:
 *           type: string
 */

Route.post('session', 'SessionController.store')
// Route.get('docs', 'DocumentationController.index')
Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.post('users', 'UserController.store').validator('User/store').middleware('is:')
  Route.put('users/:id', 'UserController.update').validator('User/update')

  Route.post('forgotpassword', 'ForgotPasswordController.store').validator(
    'ForgotPassword/store'
  )

  Route.put('forgotpassword', 'ForgotPasswordController.update').validator(
    'ForgotPassword/ForgotPasswordUpdate'
  )

  Route.get('departments', 'DepartmentController.index')
  Route.get('departments', 'DepartmentController.show') // faz que agora tu sabe fazer direito, tu fez na agenda
  Route.post('departments', 'DepartmentController.store').validator('Department')
  Route.put('departments/:id', 'DepartmentController.update').validator('Department')
  Route.delete('departments/:id', 'DepartmentController.destroy')

  Route.get('desks', 'DeskController.index')
  Route.get('desks/:id', 'DeskController.show')
  Route.post('desks', 'DeskController.store').validator('Desk/store')

  Route.get('locales', 'LocaleController.index')
  Route.get('locales/:id', 'LocaleController.show')
  Route.post('locales', 'LocaleController.store')
  Route.delete('locales/:id', 'LocaleController.destroy')

  Route.get('schedules.index', 'ScheduleController')
  Route.get('schedules.show/:id', 'ScheduleController')
  Route.post('schedules.store', 'ScheduleController').validator('Schedule/store')

  Route.get('checkouts', 'CheckoutController.index')
  Route.get('checkouts/:id', 'CheckoutController.show')
  Route.put('checkouts/:id', 'CheckoutController.update')
}).middleware(['auth'])

Route.group(() => {
  Route.resource('permissions', 'PermissionController')
    .apiOnly()

  Route.resource('roles', 'RoleController')
    .apiOnly()
}).middleware(['auth', 'is:administrator'])
