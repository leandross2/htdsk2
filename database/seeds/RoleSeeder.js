'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class RoleSeeder {
  async run () {
    await Factory.model('Adonis/Acl/Role').createMany(1, [
      {
        slug: 'administrator',
        name: 'Administrator',
        description:
          'Administrador do sistema, com acesso e permissão em todas as áreas'
      }
      // {
      //   slug: 'recepcionist',
      //   name: 'Recepcionist',
      //   description: 'Recepcionista da empresa, com acesso a dados de usuários e agenda, com  permissão leitura e criação de novos usuarios, leitura e atualização da agenda'
      // }
    ])

    await Database.table('permission_role').insert([
      {
        permission_id: 1,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 2,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 3,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 4,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 5,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 6,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 7,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 8,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 9,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 10,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 11,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 12,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 13,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 14,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 15,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 16,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 17,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 18,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 19,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 20,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 21,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 22,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 23,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 24,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        permission_id: 25,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}

module.exports = RoleSeeder
