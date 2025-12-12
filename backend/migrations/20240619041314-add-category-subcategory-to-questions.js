'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'category', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Questions', 'subcategory', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'category');
    await queryInterface.removeColumn('Questions', 'subcategory');
  }
};
