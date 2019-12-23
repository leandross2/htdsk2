'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PermissionSeeder {
  async run() {
    await Factory.model('Adonis/Acl/Permission').createMany(26, [
      {
        slug: 'create_users',
        name: 'Create user',
        description: 'Permite o cadastro de novos usuários'
      },
      {
        slug: 'update_users',
        name: 'Update user',
        description: 'Permite alterar o registro dos usuários cadastrados'
      },
      {
        slug: 'read_users',
        name: 'Read user',
        description: 'Permite a leitura do registro dos usuários cadastrados'
      },
      {
        slug: 'read_one_users',
        name: 'Read one user',
        description: 'Permite a leitura do registro de um usuários expecifico'
      },
      {
        slug: 'delete_users',
        name: 'Delete user',
        description: 'Permite deletar o registro dos usuários cadastrados'
      },
      {
        slug: 'create_departments',
        name: 'Create departments',
        description: 'Permite o cadastro de novos departamentos'
      },
      {
        slug: 'update_departments',
        name: 'Update departments',
        description: 'Permite alterar o registro dos departamentos cadastrados'
      },
      {
        slug: 'read_departments',
        name: 'Read departments',
        description:
          'Permite leitura dos registro dos departamentos cadastrados'
      },
      {
        slug: 'read_one_departments',
        name: 'Read one departments',
        description:
          'Permite a leitura do registro de um departamento expecifico'
      },
      {
        slug: 'delete_departments',
        name: 'Delete departments',
        description: 'Permite deletar o registro dos departamentos cadastrados'
      },
      {
        slug: 'create_desks',
        name: 'Create desks',
        description: 'Permite o cadastro de novas mesas'
      },
      {
        slug: 'update_desks',
        name: 'Update desks',
        description: 'Permite alterar o registro das mesas cadastrados'
      },
      {
        slug: 'read_desks',
        name: 'Read desks',
        description: 'Permite leitura dos registro das mesas cadastrados'
      },
      {
        slug: 'read_one_desk',
        name: 'Read one desk',
        description: 'Permite a leitura do registro de uma mesa expecifica'
      },
      {
        slug: 'delete_desks',
        name: 'Delete desks',
        description: 'Permite deletar o registro das delete cadastrados'
      },
      {
        slug: 'create_schedules',
        name: 'Create schedules',
        description: 'Permite o cadastro de novos agendamentos'
      },
      {
        slug: 'create_for_others_schedules',
        name: 'Create for others schedules',
        description: 'Permite o cadastro de novos agendamentos para outros usuarios'
      },
      {
        slug: 'update_schedules',
        name: 'Update schedules',
        description: 'Permite alterar o registro dos agendamentos cadastrados'
      },
      {
        slug: 'read_schedules',
        name: 'Read schedules',
        description: 'Permite leitura dos registro dos agendamentos cadastrados'
      },
      {
        slug: 'read_one_schedule',
        name: 'Read one schedule',
        description:
          'Permite a leitura do registro de um agendamento expecifico'
      },
      {
        slug: 'delete_schedules',
        name: 'Delete schedules',
        description: 'Permite deletar o registro dos agendamentos cadastrados'
      },
      {
        slug: 'create_locales',
        name: 'Create locales',
        description: 'Permite o cadastro de novos locais'
      },
      {
        slug: 'update_locales',
        name: 'Update locales',
        description: 'Permite alterar o registro dos locais cadastrados'
      },
      {
        slug: 'read_locales',
        name: 'Read locales',
        description: 'Permite leitura dos registro dos locais cadastrados'
      },
      {
        slug: 'read_one_locale',
        name: 'Read one locale',
        description: 'Permite a leitura do registro de um local expecifico'
      },
      {
        slug: 'delete_locales',
        name: 'Delete locales',
        description: 'Permite deletar o registro dos locais cadastrados'
      }
    ])
  }
}

module.exports = PermissionSeeder
