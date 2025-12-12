'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // カテゴリの挿入
    await queryInterface.bulkInsert('Categories', [{
      name: 'JSTQB',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // 挿入されたカテゴリのIDを取得
    const [category] = await queryInterface.sequelize.query(
      "SELECT id FROM Categories WHERE name = 'JSTQB'",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // サブカテゴリの挿入
    await queryInterface.bulkInsert('Subcategories', [{
      name: 'FL',
      category_id: category.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // 挿入されたサブカテゴリのIDを取得
    const [subcategory] = await queryInterface.sequelize.query(
      "SELECT id FROM Subcategories WHERE name = 'FL'",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // 問題の挿入
    await queryInterface.bulkInsert('Questions', [
      {
        category_id: category.id,
        subcategory_id: subcategory.id,
        category: 'JSTQB',
        subcategory: 'FL',
        title: '概要',
        statement: '問題: ソフトウェア開発においてテストが必要な主な理由は何ですか？',
        difficulty: 'easy',
        access_level: 'unauthorized',
        explanation: '解説: テストは欠陥を早期に検出し、修正することでソフトウェアの品質を保証し、最終的な製品の信頼性を高めるために不可欠です。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: category.id,
        subcategory_id: subcategory.id,
        category: 'JSTQB',
        subcategory: 'FL',
        title: '追加問題1',
        statement: '問題: テスト駆動開発 (TDD) とは何ですか？',
        difficulty: 'medium',
        access_level: 'unauthorized',
        explanation: '解説: TDDは、まずテストケースを作成し、そのテストに合格するためのコードを記述する開発手法です。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: category.id,
        subcategory_id: subcategory.id,
        category: 'JSTQB',
        subcategory: 'FL',
        title: '追加問題2',
        statement: '問題: 静的テストの利点は何ですか？',
        difficulty: 'hard',
        access_level: 'unauthorized',
        explanation: '解説: 静的テストは、コードを実行せずに行うテストで、早期に欠陥を発見することができ、コスト削減に役立ちます。',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // 挿入された問題のIDを取得
    const questions = await queryInterface.sequelize.query(
      "SELECT id FROM Questions",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // 選択肢の挿入
    await queryInterface.bulkInsert('question_choices', [
      // 1つ目の問題の選択肢
      {
        question_id: questions[0].id,
        choice_text: 'A. プロジェクトの進行を加速するため',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[0].id,
        choice_text: 'B. 開発コストを削減するため',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[0].id,
        choice_text: 'C. 欠陥を早期に検出し、修正するため',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[0].id,
        choice_text: 'D. プログラミングスキルを向上させるため',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 追加された問題1の選択肢
      {
        question_id: questions[1].id,
        choice_text: 'A. テストケースを作成せずにコーディングを行う開発手法',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'B. テストケースを先に作成し、そのテストに合格するコードを書く開発手法',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'C. テスト駆動開発は特定のテストツールを使う開発手法',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'D. テストを自動化するためのフレームワークを利用する開発手法',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 追加された問題2の選択肢
      {
        question_id: questions[2].id,
        choice_text: 'A. 静的テストは実行せずにコードを解析するため、早期に欠陥を発見できる',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: 'B. 静的テストは実行時のパフォーマンスを向上させる',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: 'C. 静的テストはコードの可読性を高める',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: 'D. 静的テストはエンドユーザーによる最終テストを支援する',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // question_choices, Questions, Subcategories, Categoriesの削除処理
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Subcategories', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
