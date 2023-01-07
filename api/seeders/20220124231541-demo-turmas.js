'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [
      {
        docente_id: 3,
        nivel_id: 1
      },
      {
        docente_id: 4,
        nivel_id: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
