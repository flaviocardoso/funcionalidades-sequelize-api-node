'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [
        {
          nome: 'Ana Souza',
          ativo: true,
          email: 'ana@ana.com',
          role: 'estudante',
          dataDeCricao: new Date(),
          dataDeAtualizacao: new Date(),
          versao: 0
        },
        {
          nome: 'Flavio',
          ativo: true,
          email: 'flavio@flavio.com',
          role: 'estudante',
          dataDeCricao: new Date(),
          dataDeAtualizacao: new Date(),
          versao: 0
        },
        {
          nome: 'Tiago',
          ativo: true,
          email: 'tiago@tiago.com',
          role: 'estudante',
          dataDeCricao: new Date(),
          dataDeAtualizacao: new Date(),
          versao: 0
        },
        {
          nome: 'Wagner',
          ativo: true,
          email: 'wagner@wagner.com',
          role: 'docente',
          dataDeCricao: new Date(),
          dataDeAtualizacao: new Date(),
          versao: 0
        },
        {
          nome: 'Jualiana',
          ativo: true,
          email: 'juliana@julina.com',
          role: 'docente',
          dataDeCricao: new Date(),
          dataDeAtualizacao: new Date(),
          versao: 0
        },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
