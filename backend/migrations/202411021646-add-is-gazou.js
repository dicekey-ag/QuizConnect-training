'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      after: 'statement' // statementカラムの後に追加
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'image_url');
  }
};
