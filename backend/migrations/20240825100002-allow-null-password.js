'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // まず、NULLのパスワードを持つユーザーを処理
    await queryInterface.sequelize.query(`
      UPDATE Users
      SET password = 'temporary_password'
      WHERE password IS NULL
    `);

    // その後でNOT NULL制約を設定
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
