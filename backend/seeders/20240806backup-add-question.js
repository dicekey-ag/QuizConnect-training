'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // カテゴリの挿入
    const [category] = await queryInterface.bulkInsert('Categories', [{
      name: 'JSTQB',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    const categoryId = category.id;

    // サブカテゴリの挿入
    const [subcategory] = await queryInterface.bulkInsert('Subcategories', [{
      name: 'FL',
      category_id: categoryId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    const subcategoryId = subcategory.id;

    // 問題の挿入
    const [question] = await queryInterface.bulkInsert('Questions', [{
      category_id: categoryId,
      subcategory_id: subcategoryId,
      category: 'JSTQB',
      subcategory: 'FL',
      title: '概要',
      statement: '問題: ソフトウェア開発においてテストが必要な主な理由は何ですか？',
      difficulty: 'K2',
      access_level: 'unauthorized',
      explanation: '解説: テストは欠陥を早期に検出し、修正することでソフトウェアの品質を保証し、最終的な製品の信頼性を高めるために不可欠です。',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    const questionId = question.id;

    // 選択肢の挿入
    await queryInterface.bulkInsert('question_choices', [
      {
        question_id: questionId,
        choice_text: 'A. プロジェクトの進行を加速するため',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questionId,
        choice_text: 'B. 開発コストを削除するため',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questionId,
        choice_text: 'C. 欠陥を早期に検出し、修正するため',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questionId,
        choice_text: 'D. プログラミングスキルを向上させるため',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // カテゴリ、サブカテゴリ、問題、選択肢を削除する処理
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Subcategories', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
