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

Factory.blueprint('Adonis/Acl/Permission', async (faker, index, data) => {
  try {
    console.log(`${data.length} index ${index}  data ${data[index].name}`)
  } catch (err) {
    console.log(`RUIM!!!!! ${index},`)
    console.log(`data ${data[index].name}`)
  }
  // return {
  //   slug: data[index].slug,
  //   name: data[index].name,
  //   description: data[index].description
  // }
})
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

Factory.blueprint('App/Models/Locale', async (faker, index, data) => ({
  description: data[index].description
}))
