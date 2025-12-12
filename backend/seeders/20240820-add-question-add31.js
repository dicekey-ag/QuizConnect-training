'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 既存のデータを削除
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Subcategories', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    // カテゴリの挿入
    await queryInterface.bulkInsert('Categories', [
      { name: 'JSTQB-FL1章', createdAt: new Date(), updatedAt: new Date() },
      { name: 'JSTQB-FL2章', createdAt: new Date(), updatedAt: new Date() },
      { name: 'JSTQB-FL3章', createdAt: new Date(), updatedAt: new Date() },
      { name: 'JSTQB-FL4章', createdAt: new Date(), updatedAt: new Date() },
      { name: 'JSTQB-FL5章', createdAt: new Date(), updatedAt: new Date() },
      { name: 'JSTQB-FL6章', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // カテゴリのID取得
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // サブカテゴリの挿入
    await queryInterface.bulkInsert('Subcategories', [
      // JSTQB-FL1章
      { name: '1.1.1', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.1.2', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.2.1', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.2.2', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.2.3', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.3.1', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.4.1', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.4.2', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.4.3', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.4.4', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.4.5', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.5.1', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.5.2', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '1.5.3', category_id: categories.find(c => c.name === 'JSTQB-FL1章').id, createdAt: new Date(), updatedAt: new Date() },

      // JSTQB-FL2章
      { name: '2.1.1', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.1.2', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.1.3', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.1.4', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.1.5', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.1.6', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.2.1', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.2.2', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '2.2.3', category_id: categories.find(c => c.name === 'JSTQB-FL2章').id, createdAt: new Date(), updatedAt: new Date() },

      // JSTQB-FL3章
      { name: '3.1.1', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.1.2', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.1.3', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.2.1', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.2.2', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.2.3', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.2.4', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '3.2.5', category_id: categories.find(c => c.name === 'JSTQB-FL3章').id, createdAt: new Date(), updatedAt: new Date() },

      // JSTQB-FL4章
      { name: '4.1.1', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.2.1', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.2.2', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.2.3', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.2.4', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.3.1', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.3.2', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.3.3', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.4.1', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.4.2', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.4.3', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.5.1', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.5.2', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '4.5.3', category_id: categories.find(c => c.name === 'JSTQB-FL4章').id, createdAt: new Date(), updatedAt: new Date() },

      // JSTQB-FL5章
      { name: '5.1.1', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.1.2', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.1.3', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.1.4', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.1.5', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.1.6', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.1.7', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.2.1', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.2.2', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.2.3', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.2.4', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.3.1', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.3.2', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '5.3.3', category_id: categories.find(c => c.name === 'JSTQB-FL5章').id, createdAt: new Date(), updatedAt: new Date() },

      // JSTQB-FL6章
      { name: '6.1.1', category_id: categories.find(c => c.name === 'JSTQB-FL6章').id, createdAt: new Date(), updatedAt: new Date() },
      { name: '6.2.1', category_id: categories.find(c => c.name === 'JSTQB-FL6章').id, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // サブカテゴリのID取得
    const subcategories = await queryInterface.sequelize.query(
      'SELECT id, name, category_id FROM Subcategories;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const difficulties = ['K1', 'K2', 'K3', 'k1', 'K2', 'K3']; // 難易度配列

    const insertQuestionsForChapter = async (chapterName, subcategoryNames, difficulties) => {
      let difficultyIndex = 0;
      for (let index = 0; index < subcategoryNames.length; index++) {
        const subcategoryName = subcategoryNames[index];
        await queryInterface.bulkInsert('Questions', [{
          category_id: categories.find(c => c.name === chapterName).id,
          subcategory_id: subcategories.find(s => s.name === subcategoryName).id,
          category: chapterName,
          subcategory: subcategoryName,
          title: `${chapterName.replace('章', '')}-${index + 1}`,
          statement: `問題文-${index + 1}`,
          difficulty: difficulties[difficultyIndex],
          access_level: 'unauthorized',
          explanation: `解説-${index + 1}`,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
        difficultyIndex = (difficultyIndex + 1) % difficulties.length;
      }
    };

    // 問題の挿入
    await Promise.all([
      insertQuestionsForChapter('JSTQB-FL1章', ['1.1.1', '1.1.2', '1.2.1', '1.2.2', '1.2.3', '1.3.1', '1.4.1', '1.4.2', '1.4.3', '1.4.4', '1.4.5', '1.5.1', '1.5.2', '1.5.3'], difficulties),
      insertQuestionsForChapter('JSTQB-FL2章', ['2.1.1', '2.1.2', '2.1.3', '2.1.4', '2.1.5', '2.1.6', '2.2.1', '2.2.2', '2.2.3'], difficulties),
      insertQuestionsForChapter('JSTQB-FL3章', ['3.1.1', '3.1.2', '3.1.3', '3.2.1', '3.2.2', '3.2.3', '3.2.4', '3.2.5'], difficulties),
      insertQuestionsForChapter('JSTQB-FL4章', ['4.1.1', '4.2.1', '4.2.2', '4.2.3', '4.2.4', '4.3.1', '4.3.2', '4.3.3', '4.4.1', '4.4.2', '4.4.3', '4.5.1', '4.5.2', '4.5.3'], difficulties),
      insertQuestionsForChapter('JSTQB-FL5章', ['5.1.1', '5.1.2', '5.1.3', '5.1.4', '5.1.5', '5.1.6', '5.1.7', '5.2.1', '5.2.2', '5.2.3', '5.2.4', '5.3.1', '5.3.2', '5.3.3'], difficulties),
      insertQuestionsForChapter('JSTQB-FL6章', ['6.1.1', '6.2.1'], difficulties)
    ]);


    // 挿入された問題のIDを取得
    const allQuestions = await queryInterface.sequelize.query(
      "SELECT id FROM Questions",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );


    // 選択肢の挿入
    for (const question of allQuestions) {
      const correctIndex = Math.floor(Math.random() * 4);
      await Promise.all(
        Array.from({ length: 4 }, (_, i) =>
          queryInterface.bulkInsert('question_choices', [{
            question_id: question.id,
            choice_text: `選択肢-${i + 1}`,
            is_correct: i === correctIndex,
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        )
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // question_choices, Questions, Subcategories, Categoriesの削除処理
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Subcategories', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
