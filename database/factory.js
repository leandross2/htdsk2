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
  description: data[index].description,
}))
Factory.blueprint('Adonis/Acl/Role', async (faker, index, data) => ({
  slug: data[index].slug,
  name: data[index].name,
  description: data[index].description,
}))

Factory.blueprint('App/Models/User', async (faker, index, data = {}) => ({
  name: faker.name(),
  email: faker.email(),
  password: faker.password(),
  ...data,
}))

Factory.blueprint('App/Models/Locale', async (faker, index, data) => ({
  description: data[index].description,
}))

Factory.blueprint('App/Models/Desk', async (faker, index, data) => ({
  description: data[index].description,
  position: data[index].position,
  locale_id: data[index].locale_id,
}))

Factory.blueprint('App/Models/Schedule', async (faker, index, data) => ({
  date_schedule: data.date_schedule,
  user_id: data.user_id,
  desk_id: data.desk_id,
}))
