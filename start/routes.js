'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

const Helpers = use('Helpers')
Route.get('docs', ({ response }) =>
  response.download(Helpers.publicPath('index.html'))
)
/**
 * @apiDescription rota sucesso
 * @api {get} /
 */
Route.get('/', () => ({ sucesso: true }))

/**
 * @apiDescription rota sucesso
 * @api {post} /session
 * @apiGroup Session
 */
Route.post('session', 'SessionController.store')

/**
 * @apiDescription forgot password
 * @api {post} /forgotpassword
 * @apiGroup ForgotPassword
 */
Route.post('forgotpassword', 'ForgotPasswordController.store').validator(
  'ForgotPassword/store'
)
/**
 * @apiDescription forgot password
 * @api {put} /forgotpassword
 * @apiGroup ForgotPassword
 */
Route.put('forgotpassword', 'ForgotPasswordController.update').validator(
  'ForgotPassword/update'
)

Route.group(() => {
  /**
   * @apiDescription users
   * @api {get} /users
   * @apiGroup Users
   */
  Route.get('users', 'UserController.index').middleware('can:read_users')

  /**
   * @apiDescription users
   * @api {get} /users/:id
   * @apiGroup Users
   * @apiPermission tss
   */
  Route.get('users/:id', 'UserController.show')

  /**
   * @apiDescription users
   * @api {post} /users
   * @apiGroup Users
   */
  Route.post('users', 'UserController.store')
    .validator('User/store')
    .middleware('can:create_users')

  /**
   * @apiDescription users
   * @api {put} /users/id
   * @apiGroup Users
   */

  Route.put('users/:id', 'UserController.update')
    .validator('User/update')
    .middleware('can:update_users')

  /**
   * @apiDescription Departments
   * @api {get} /departments
   * @apiGroup Departments
   */
  Route.get('departments', 'DepartmentController.index').middleware(
    'can:read_departments'
  )

  /**
   * @apiDescription Departments
   * @api {get} /departments/:id
   * @apiGroup Departments
   */
  Route.get('departments/id', 'DepartmentController.show').middleware(
    'can:read_departments'
  )
  /**
   * @apiDescription Departments
   * @api {post} /departments
   * @apiGroup Departments
   */
  Route.post('departments', 'DepartmentController.store')
    .validator('Department')
    .middleware('can:create_departments')
  /**
   * @apiDescription Departments
   * @api {put} /departments/:id
   * @apiGroup Departments
   */
  Route.put('departments/:id', 'DepartmentController.update')
    .validator('Department')
    .middleware('can:update_departments')
  /**
   * @apiDescription Departments
   * @api {delete} /departments/:id
   * @apiGroup Departments
   */
  Route.delete('departments/:id', 'DepartmentController.destroy').middleware(
    'can:delete_departments'
  )

  /**
   * @apiDescription Desks
   * @api {get} /desks
   * @apiGroup Desks
   */
  Route.get('desks', 'DeskController.index').middleware('can:read_desks')
  /**
   * @apiDescription Desks
   * @api {get} /desks/:id
   * @apiGroup Desks
   */
  Route.get('desks/:id', 'DeskController.show').middleware('can:read_desks')
  /**
   * @apiDescription Desks
   * @api {pst} /desks
   * @apiGroup Desks
   */
  Route.post('desks', 'DeskController.store')
    .validator('Desk/store')
    .middleware('can:create_desks')
  /**
   * @apiDescription Desks
   * @api {delete} /desks
   * @apiGroup Desks
   */
  Route.delete('desks/:id', 'DeskController.destroy').middleware(
    'can:delete_desks'
  )

  /**
   * @apiDescription locales
   * @api {get} /locales
   * @apiGroup Locales
   */
  Route.get('locales', 'LocaleController.index').middleware('can:read_locales')
  /**
   * @apiDescription locales
   * @api {get} /locales/:id
   * @apiGroup Locales
   */
  Route.get('locales/:id', 'LocaleController.show').middleware(
    'can:read_locales'
  )
  /**
   * @apiDescription locales
   * @api {post} /locales
   * @apiGroup Locales
   */
  Route.post('locales', 'LocaleController.store').middleware(
    'can:create_locales'
  )
  /**
   * @apiDescription locales
   * @api {delete} /locales/:id
   * @apiGroup Locales
   */
  Route.delete('locales/:id', 'LocaleController.destroy').middleware(
    'can:delete_locales'
  )

  /**
   * @apiDescription schedules
   * @api {get} /schedules/:id
   * @apiGroup Schedules
   */
  Route.get('schedules', 'ScheduleController.index').middleware(
    'can:read_schedules'
  )

  /**
   * @apiDescription schedules
   * @api {get} /schedules/:id
   * @apiGroup Schedules
   */
  Route.get('schedules/:id', 'ScheduleController.show').middleware(
    'can:read_schedules'
  )
  /**
   * @apiDescription schedules
   * @api {post} /schedules
   * @apiGroup Schedules
   */
  Route.post('schedules', 'ScheduleController.store')
    .validator('Schedule/store')
    .middleware('can:create_schedules')

  /**
   * @apiDescription schedules
   * @api {put} /schedules/:id
   * @apiGroup Schedules
   */
  Route.put('schedules/:id', 'ScheduleController.update').middleware(
    'can:update_schedules'
  )
  /**
   * @apiDescription schedules
   * @api {delete} /schedules/:id
   * @apiGroup Schedules
   */
  Route.delete('schedules/:id', 'ScheduleController.destroy').middleware(
    'can:delete_schedules'
  )

  /**
   * @apiDescription checkouts
   * @api {get} /checkouts
   * @apiGroup Checkouts
   */
  Route.get('checkouts', 'CheckoutController.index').middleware(
    'can:read_schedules'
  )
  /**
   * @apiDescription checkouts
   * @api {get} /checkouts/:id
   * @apiGroup Checkouts
   */
  Route.get('checkouts/:id', 'CheckoutController.show').middleware(
    'can:read_schedules'
  )
  /**
   * @apiDescription checkouts
   * @api {put} /checkouts/:id
   * @apiGroup Checkouts
   */
  Route.put('checkouts/:id', 'CheckoutController.update').middleware(
    'can:update_schedules'
  )
}).middleware(['auth'])

Route.group(() => {
  /**
   * @apiDescription permissions
   * @api {get} /permissions
   * @apiGroup Permissions
   */
  /**
   * @apiDescription permissions
   * @api {get} /permissions/:id
   * @apiGroup Permissions
   */
  /**
   * @apiDescription permissions
   * @api {post} /permissions
   * @apiGroup Permissions
   */
  /**
   * @apiDescription permissions
   * @api {put} /permissions/:id
   */
  /**
   * @apiDescription permissions
   * @api {delete} /permissions/:id
   * @apiGroup Permissions
   */
  Route.resource('permissions', 'PermissionController').apiOnly()

  /**
   * @apiDescription roles
   * @api {get} /roles
   * @apiGroup Roles
   */
  /**
   * @apiDescription roles
   * @api {get} /roles/:id
   * @apiGroup Roles
   */
  /**
   * @apiDescription roles
   * @api {post} /roles
   * @apiGroup Roles
   */
  /**
   * @apiDescription roles
   * @api {put} /roles/:id
   * @apiGroup Roles
   */
  /**
   * @apiDescription roles
   * @api {delete} /roles/:id
   * @apiGroup Roles
   */
  Route.resource('roles', 'RoleController').apiOnly()
}).middleware(['auth', 'is:administrator'])
