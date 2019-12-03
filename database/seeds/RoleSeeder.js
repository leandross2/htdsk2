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

class RoleSeeder {
  async run () {
    await Factory.model('Adonis/Acl/Role').createMany(2, [
      {
        slug: 'administrator',
        name: 'Administrator',
        description: 'Administrador do sistema, com acesso e permissão em todas as áreas'
      },
      {
        slug: 'recepcionist',
        name: 'Recepcionist',
        description: 'Recepcionista da empresa, com acesso a dados de usuários e agenda, com  permissão leitura e criação de novos usuarios, leitura e atualização da agenda'
      }
    ])
  }
}

module.exports = RoleSeeder
