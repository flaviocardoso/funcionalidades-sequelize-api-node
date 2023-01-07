'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [
      {
        descr_nivel: 'básico',
        dataDeCricao: new Date(),
        dataDeAtualizacao: new Date(),
        versao: 0
      },
      {
        descr_nivel: 'intermediário',
        dataDeCricao: new Date(),
        dataDeAtualizacao: new Date(),
        versao: 0
      },
      {
        descr_nivel: 'avançado',
        dataDeCricao: new Date(),
        dataDeAtualizacao: new Date(),
        versao: 0
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
