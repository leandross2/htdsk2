'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run() {
    await Factory.model('App/Models/User').create({
      name: 'admin',
      email: 'administrator@htdsk.com',
      password: '123'
    })

    await Database.table('role_user').insert({
      role_id: 1,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    })
  }
}

module.exports = UserSeeder
