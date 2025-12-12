'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 全てのパスワードをハッシュ化
    const hashedFreePassword = await bcryptjs.hash('freepassword', 10);
    const hashedPaidPassword = await bcryptjs.hash('paidpassword', 10);

    await queryInterface.bulkInsert('Users', [
      // Free users
      {
        username: 'free_user2',
        email: 'free2@example.com',
        password: hashedFreePassword,
        role: 'free',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'free_user3',
        email: 'free3@example.com',
        password: hashedFreePassword,
        role: 'free',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'free_user4',
        email: 'free4@example.com',
        password: hashedFreePassword,
        role: 'free',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'free_user5',
        email: 'free5@example.com',
        password: hashedFreePassword,
        role: 'free',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Paid users
      {
        username: 'paid_user2',
        email: 'paid2@example.com',
        password: hashedPaidPassword,
        role: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'paid_user3',
        email: 'paid3@example.com',
        password: hashedPaidPassword,
        role: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'paid_user4',
        email: 'paid4@example.com',
        password: hashedPaidPassword,
        role: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'paid_user5',
        email: 'paid5@example.com',
        password: hashedPaidPassword,
        role: 'paid',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // 追加したユーザーを削除
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [
          'free2@example.com',
          'free3@example.com',
          'free4@example.com',
          'free5@example.com',
          'paid2@example.com',
          'paid3@example.com',
          'paid4@example.com',
          'paid5@example.com'
        ]
      }
    }, {});
  }
};
