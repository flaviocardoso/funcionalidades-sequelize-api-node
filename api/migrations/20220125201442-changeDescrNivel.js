'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Niveis', 'descr_nivel', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.changeColumn('Niveis', 'descr_nivel', {
          type: Sequelize.ENUM('básico', 'básico2', 'intermediário', 'intermediário2', 'avançado', 'avançado2')
        }, { transaction: t })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Niveis', 'descr_nivel', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.changeColumn('Niveis', 'descr_nivel', {
          type: Sequelize.ENUM('básico', 'intermediário', 'avançado')
        }, { transaction: t })
      ])
    })
  }
};
