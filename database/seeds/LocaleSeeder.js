'use strict'

/*
|--------------------------------------------------------------------------
| LocaleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class LocaleSeeder {
  async run () {
    await Factory.model('App/Models/Locale').createMany(2, [
      { description: 'POA' },
      { description: 'SP' }
    ])
  }
}

module.exports = LocaleSeeder
