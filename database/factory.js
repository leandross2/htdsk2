'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('Adonis/Acl/Permission', async (faker, index, data) => ({
  slug: data[index].slug,
  name: data[index].name,
  description: data[index].description
}))
Factory.blueprint('Adonis/Acl/Role', async (faker, index, data) => ({
  slug: data[index].slug,
  name: data[index].name,
  description: data[index].description
}))

Factory.blueprint('App/Models/User', async (faker, index, data) => ({
  name: data.name,
  email: data.email,
  password: data.password
}))
