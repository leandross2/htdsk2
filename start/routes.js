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

// forgot password
Route.post('forgotpassword', 'ForgotPasswordController.store').validator(
  'ForgotPassword/store'
)
Route.put('forgotpassword', 'ForgotPasswordController.update').validator(
  'ForgotPassword/ForgotPasswordUpdate'
)
// Route.get('docs', 'DocumentationController.index')
Route.group(() => {
  // users
  Route.get('users', 'UserController.index').middleware('can:read_users')
  Route.get('users/:id', 'UserController.show').middleware('can:read_users')
  Route.post('users', 'UserController.store')
    .validator('User/store')
    .middleware('can:create_users')
  Route.put('users/:id', 'UserController.update')
    .validator('User/update')
    .middleware('can:update_users')

  // departments
  Route.get('departments', 'DepartmentController.index').middleware(
    'can:read_departments'
  )
  Route.get('departments', 'DepartmentController.show').middleware(
    'can:read_departments'
  ) // faz que agora tu sabe fazer direito, tu fez na agenda
  Route.post('departments', 'DepartmentController.store')
    .validator('Department')
    .middleware('can:create_departments')
  Route.put('departments/:id', 'DepartmentController.update')
    .validator('Department')
    .middleware('can:update_departments')
  Route.delete('departments/:id', 'DepartmentController.destroy').middleware(
    'can:delete_departments'
  )

  // desks
  Route.get('desks', 'DeskController.index').middleware('can:read_desks')
  Route.get('desks/:id', 'DeskController.show').middleware('can:read_desks')
  Route.post('desks', 'DeskController.store')
    .validator('Desk/store')
    .middleware('can:create_desks')
  Route.delete('desks/:id', 'DeskController.destroy').middleware(
    'can:delete_desks'
  )

  // locales
  Route.get('locales', 'LocaleController.index').middleware('can:read_locales')
  Route.get('locales/:id', 'LocaleController.show').middleware(
    'can:read_locales'
  )
  Route.post('locales', 'LocaleController.store').middleware(
    'can:create_locales'
  )
  Route.delete('locales/:id', 'LocaleController.destroy').middleware(
    'can:delete_locales'
  )

  // schedules
  Route.get('schedules', 'ScheduleController.index').middleware(
    'can:read_schedules'
  )
  Route.get('schedules/:id', 'ScheduleController.show').middleware(
    'can:read_schedules'
  )
  Route.post('schedules', 'ScheduleController.store')
    .validator('Schedule/store')
    .middleware('can:create_schedules')

  // checkouts
  Route.get('checkouts', 'CheckoutController.index').middleware(
    'can:read_schedules'
  )
  Route.get('checkouts/:id', 'CheckoutController.show').middleware(
    'can:read_schedules'
  )
  Route.put('checkouts/:id', 'CheckoutController.update').middleware(
    'can:update_schedules'
  )
}).middleware(['auth'])

Route.group(() => {
  // permissions
  Route.resource('permissions', 'PermissionController').apiOnly()
  // roles
  Route.resource('roles', 'RoleController').apiOnly()
}).middleware(['auth', 'is:administrator'])
