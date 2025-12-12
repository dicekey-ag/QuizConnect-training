'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedAdminPassword = await bcryptjs.hash('adminpassword', 10);
    const hashedAdmin2Password = await bcryptjs.hash('admin2password', 10);
    const hashedPaidPassword = await bcryptjs.hash('paidpassword', 10);
    const hashedFreePassword = await bcryptjs.hash('freepassword', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin_user2',
        email: 'admin2@example.com',
        password: hashedAdmin2Password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'paid_user',
        email: 'paid@example.com',
        password: hashedPaidPassword,
        role: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
