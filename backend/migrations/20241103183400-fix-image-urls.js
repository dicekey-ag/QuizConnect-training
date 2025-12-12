// migrations/20241103183400-fix-image-urls.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // image_urlカラムの型を再定義（必要な場合）
      await queryInterface.changeColumn('Questions', 'image_url', {
        type: Sequelize.STRING,
        allowNull: true
      });

      // 既存のデータのパスを修正
      const [questions] = await queryInterface.sequelize.query(
        'SELECT id, image_url FROM Questions WHERE image_url IS NOT NULL AND image_url != "null"'
      );

      for (const question of questions) {
        if (question.image_url) {
          // 重複スラッシュの除去とパス修正
          const cleanedUrl = question.image_url
            .replace(/^\/+/, '')
            .replace(/^(api\/)?uploads\//, '')
            .replace(/\/+/g, '/');

          await queryInterface.sequelize.query(
            'UPDATE Questions SET image_url = ? WHERE id = ?',
            {
              replacements: [cleanedUrl, question.id],
              type: queryInterface.sequelize.QueryTypes.UPDATE
            }
          );
        }
      }

      console.log('Successfully updated image URLs');
      return Promise.resolve();
    } catch (error) {
      console.error('Migration failed:', error);
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // 必要に応じて元の状態に戻す処理を実装
      await queryInterface.changeColumn('Questions', 'image_url', {
        type: Sequelize.STRING,
        allowNull: true
      });

      return Promise.resolve();
    } catch (error) {
      console.error('Rollback failed:', error);
      return Promise.reject(error);
    }
  }
};
