'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Questions', 'difficulty', {
      type: Sequelize.ENUM('easy', 'medium', 'hard', 'K1', 'K2', 'K3', 'K4'),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // まず、既存のデータを 'easy', 'medium', 'hard' に変換
    await queryInterface.sequelize.query(`
      UPDATE Questions
      SET difficulty = CASE
        WHEN difficulty IN ('K1', 'K2') THEN 'easy'
        WHEN difficulty IN ('K3') THEN 'medium'
        WHEN difficulty IN ('K4') THEN 'hard'
        ELSE difficulty
      END
    `);

    // その後、ENUMを変更
    await queryInterface.changeColumn('Questions', 'difficulty', {
      type: Sequelize.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    });
  }
};
