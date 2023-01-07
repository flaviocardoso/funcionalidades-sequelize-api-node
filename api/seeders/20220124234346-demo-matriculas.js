'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [
      {
        status: 'cancelado',
        estudante_id: 1,
        turma_id: 1
      },
      {
        status: 'confirmado',
        estudante_id: 2,
        turma_id: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
