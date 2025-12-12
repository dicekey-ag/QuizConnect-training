'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Questions', 'access_level', {
      type: Sequelize.ENUM('unauthorized', 'free', 'paid', 'admin'),
      allowNull: false,
      defaultValue: 'unauthorized'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Questions', 'access_level', {
      type: Sequelize.ENUM('unauthorized', 'free', 'paid', 'admin'),
      allowNull: false,
      defaultValue: 'free'
    });
  }
};
