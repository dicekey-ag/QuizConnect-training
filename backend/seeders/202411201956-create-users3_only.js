'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedFreePassword = await bcryptjs.hash('freepassword', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'free_user',
        email: 'free@example.com',
        password: hashedFreePassword,
        role: 'free',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'free@example.com' }, {});
  }
};
