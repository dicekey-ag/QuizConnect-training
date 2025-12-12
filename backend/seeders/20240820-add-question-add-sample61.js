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


    // 問題の挿入
    await queryInterface.bulkInsert('Questions', [
      // JSTQB-FL1章 1.1.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.1.1').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.1.1',
        title: 'どこで改行されるかテスト。',
        statement: '単体テスト（ユニットテスト）の目的は、**個々のソフトウェアの単位（ユニット）**が期待通りに動作することを確認することです。ユニットテストはソフトウェア開発における基礎的なテスト手法であり、以下のような目的や利点があります。',
        difficulty: 'K1',
        access_level: 'unauthorized',
        explanation: '単体テストの主な目的　コードの正確性の検証:個々の関数、メソッド、クラス、またはモジュールが期待通りの動作をするかどうかを確認します。各ユニットがその仕様に基づいて正しく動作することを保証するためにテストします。　バグの早期発見:開発の初期段階でバグやエラーを見つけることができます。これにより、後の段階で発見されるよりも修正が容易で、修正コストを削減することができます。　コードの品質向上:テストを書くことで、コードがより良い構造になり、可読性や再利用性が向上することがあります。特に、テスト可能なコードを書くことを意識することで、コードの設計が改善されることが多いです。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.1.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.1.2').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.1.2',
        title: '12345678910,12345678910',
        statement: 'abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: 'abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,abcdefghijklmnopqrstuvwxyz,',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.2.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.2.1').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.2.1',
        title: '１２３４５６７８９０１２３',
        statement: 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.2.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.2.2').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.2.2',
        title: '改行コードのテスト。',
        statement: '単体テスト（ユニットテスト）の目的は、\n個々のソフトウェアの単位（ユニット）が期待通りに動作することを確認することです。\nユニットテストはソフトウェア開発における基礎的なテスト手法であり、\n以下のような目的や利点があります。',
        difficulty: 'K1',
        access_level: 'unauthorized',
        explanation: '単体テストの主な目的\nコードの正確性の検証:個々の関数、メソッド、クラス、またはモジュールが期待通りの動作をするかどうかを確認します。<br>各ユニットがその仕様に基づいて正しく動作することを保証するためにテストします。<br>バグの早期発見:開発の初期段階でバグやエラーを見つけることができます。<br>これにより、後の段階で発見されるよりも修正が容易で、修正コストを削減することができます。<br>コードの品質向上:テストを書くことで、コードがより良い構造になり、可読性や再利用性が向上することがあります。<br>特に、テスト可能なコードを書くことを意識することで、コードの設計が改善されることが多いです。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.2.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.2.3').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.2.3',
        title: 'テンプレートリテラルのテスト。',
        statement: `単体テスト（ユニットテスト）の目的は、
個々のソフトウェアの単位（ユニット）が期待通りに動作することを確認することです。
ユニットテストはソフトウェア開発における基礎的なテスト手法であり、
                以下のような目的や利点があります。`,
        difficulty: 'K1',
        access_level: 'unauthorized',
        explanation: `単体テストの主な目      的
コード　　の正確性の検証:個々の関数、メソッド、クラス、またはモジュールが期待通りの動作をするかどうかを確認します。
各　　ユニットがその仕様に基づいて正しく動作することを保証するためにテストします。
バグの早期発見:開発の初期段階でバグやエラーを見つけることができます。
これにより、後の段階で発見されるよりも修正が容易で、修正コストを削減することができます。
コードの品質向上:テストを書くことで、コードがより良い構造になり、可読性や再利用性が向上することがあります。
特に、　　　　　　　　テスト可能なコードを書くことを意識することで、コードの設計が改善されることが多いです。`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.3.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.3.1').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.3.1',
        title: 'PPP',
        statement: 'QQQ',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: 'RRR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.4.1').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.4.1',
        title: 'SSS',
        statement: 'TTT',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: 'UUU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.4.2').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.4.2',
        title: 'VVV',
        statement: 'WWW',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: 'XXX',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.4.3').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.4.3',
        title: 'YYY',
        statement: 'ZZZ',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '111',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.4
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.4.4').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.4.4',
        title: '222',
        statement: '333',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '444',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.5
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.4.5').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.4.5',
        title: '555',
        statement: '666',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '777',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.5.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.5.1').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.5.1',
        title: '888',
        statement: '999',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.5.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.5.2').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.5.2',
        title: '!!!',
        statement: '@@@',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '###',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.5.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL1章').id,
        subcategory_id: subcategories.find(s => s.name === '1.5.3').id,
        category: 'JSTQB-FL1章',
        subcategory: '1.5.3',
        title: '$$$',
        statement: '%%%',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '^^^',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.1.1').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.1.1',
        title: '&&&',
        statement: '***',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '+++',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.1.2').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.1.2',
        title: ',,,',
        statement: '...',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '===',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.1.3').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.1.3',
        title: '---',
        statement: '___',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '@@@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.4
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.1.4').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.1.4',
        title: '[[[',
        statement: ']]]',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '{{{',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.5
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.1.5').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.1.5',
        title: '}}}',
        statement: '|||',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '}}}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.6
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.1.6').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.1.6',
        title: '```',
        statement: '~~~',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.2.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.2.1').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.2.1',
        title: '^^^',
        statement: '&&&',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '***',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.2.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.2.2').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.2.2',
        title: '+++',
        statement: ',,,',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '===',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.2.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL2章').id,
        subcategory_id: subcategories.find(s => s.name === '2.2.3').id,
        category: 'JSTQB-FL2章',
        subcategory: '2.2.3',
        title: '...',
        statement: '---',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '___',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.1.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.1.1').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.1.1',
        title: '@@@',
        statement: '[[[',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: ']]]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.1.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.1.2').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.1.2',
        title: '{{{',
        statement: '}}}',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '|||',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.1.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.1.3').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.1.3',
        title: '}}}',
        statement: '```',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '~~~',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.2.1').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.2.1',
        title: '|||',
        statement: '^^^',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '&&&',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.2.2').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.2.2',
        title: '```',
        statement: '+++',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: ',,,',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.2.3').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.2.3',
        title: '~~~',
        statement: '...',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '---',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.4
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.2.4').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.2.4',
        title: '^^^',
        statement: '___',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '@@@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.5
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL3章').id,
        subcategory_id: subcategories.find(s => s.name === '3.2.5').id,
        category: 'JSTQB-FL3章',
        subcategory: '3.2.5',
        title: '&&&',
        statement: '[[[',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: ']]]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.1.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.1.1').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.1.1',
        title: '***',
        statement: '}}}',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '|||',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.2.1').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.2.1',
        title: '+++',
        statement: '```',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '~~~',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.2.2').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.2.2',
        title: ',,,',
        statement: '^^^',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '&&&',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.2.3').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.2.3',
        title: '...',
        statement: '+++',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: ',,,',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.4
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.2.4').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.2.4',
        title: '---',
        statement: '...',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '---',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.3.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.3.1').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.3.1',
        title: '___',
        statement: '___',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '@@@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.3.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.3.2').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.3.2',
        title: '@@@',
        statement: '[[[',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: ']]]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.3.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.3.3').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.3.3',
        title: '{{{',
        statement: '}}}',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '|||',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.4.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.4.1').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.4.1',
        title: '}}}',
        statement: '```',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '~~~',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.4.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.4.2').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.4.2',
        title: '|||',
        statement: '^^^',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '&&&',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.4.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.4.3').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.4.3',
        title: '```',
        statement: '+++',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: ',,,',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.5.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.5.1').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.5.1',
        title: '~~~',
        statement: '...',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '---',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.5.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.5.2').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.5.2',
        title: '^^^',
        statement: '___',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '@@@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.5.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL4章').id,
        subcategory_id: subcategories.find(s => s.name === '4.5.3').id,
        category: 'JSTQB-FL4章',
        subcategory: '4.5.3',
        title: '&&&',
        statement: '[[[',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: ']]]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.1').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.1',
        title: '***',
        statement: '}}}',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '|||',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.2').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.2',
        title: '+++',
        statement: '```',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '~~~',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.3').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.3',
        title: ',,,',
        statement: '^^^',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '&&&',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.4
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.4').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.4',
        title: '...',
        statement: '+++',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: ',,,',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.5
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.5').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.5',
        title: '---',
        statement: '...',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '---',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.6
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.6').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.6',
        title: '___',
        statement: '___',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '@@@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.7
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.1.7').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.1.7',
        title: '@@@',
        statement: '[[[',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: ']]]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.2.1').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.2.1',
        title: '{{{',
        statement: '}}}',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: '|||',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.2.2').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.2.2',
        title: '}}}',
        statement: '```',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '~~~',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.2.3').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.2.3',
        title: '|||',
        statement: '^^^',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '&&&',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.4
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.2.4').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.2.4',
        title: '```',
        statement: '+++',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: ',,,',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.3.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.3.1').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.3.1',
        title: '~~~',
        statement: '...',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '---',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.3.2
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.3.2').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.3.2',
        title: '^^^',
        statement: '___',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '@@@',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.3.3
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL5章').id,
        subcategory_id: subcategories.find(s => s.name === '5.3.3').id,
        category: 'JSTQB-FL5章',
        subcategory: '5.3.3',
        title: '&&&',
        statement: '[[[',
        difficulty: 'K2',
        access_level: 'unauthorized',
        explanation: ']]]',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL6章 6.1.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL6章').id,
        subcategory_id: subcategories.find(s => s.name === '6.1.1').id,
        category: 'JSTQB-FL6章',
        subcategory: '6.1.1',
        title: '***',
        statement: '}}}',
        difficulty: 'K3',
        access_level: 'unauthorized',
        explanation: '|||',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL6章 6.2.1
      {
        category_id: categories.find(c => c.name === 'JSTQB-FL6章').id,
        subcategory_id: subcategories.find(s => s.name === '6.2.1').id,
        category: 'JSTQB-FL6章',
        subcategory: '6.2.1',
        title: '+++',
        statement: '```',
        difficulty: 'k1',
        access_level: 'unauthorized',
        explanation: '~~~',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);


    // 挿入された問題のIDを取得
    const questions = await queryInterface.sequelize.query(
      "SELECT id FROM Questions",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // 選択肢の挿入
    await queryInterface.bulkInsert('question_choices', [
      // JSTQB-FL1章 1.1.1
      {
        question_id: questions[0].id,
        choice_text: 'テストケースを先に作成し、そのテストに合格するコードを書く開発手法',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[0].id,
        choice_text: 'BBBテストケースを作成せずにコーディングを行う開発手法',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[0].id,
        choice_text: 'CCCテスト駆動開発は特定のテストツールを使う開発手法',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[0].id,
        choice_text: 'DDDテストを自動化するためのフレームワークを利用する開発手法',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.1.2
      {
        question_id: questions[1].id,
        choice_text: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまめみむめも',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.2.1
      {
        question_id: questions[2].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.2.2
      {
        question_id: questions[3].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[3].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[3].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[3].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.2.3
      {
        question_id: questions[4].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[4].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[4].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[4].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.3.1
      {
        question_id: questions[5].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[5].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[5].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[5].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.1
      {
        question_id: questions[6].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[6].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[6].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[6].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.2
      {
        question_id: questions[7].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[7].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[7].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[7].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.3
      {
        question_id: questions[8].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[8].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[8].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[8].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.4
      {
        question_id: questions[9].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[9].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[9].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[9].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.4.5
      {
        question_id: questions[10].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[10].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[10].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[10].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.5.1
      {
        question_id: questions[11].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[11].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[11].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[11].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.5.2
      {
        question_id: questions[12].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[12].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[12].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[12].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL1章 1.5.3
      {
        question_id: questions[13].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[13].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[13].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[13].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.1
      {
        question_id: questions[14].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[14].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[14].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[14].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.2
      {
        question_id: questions[15].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[15].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[15].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[15].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.3
      {
        question_id: questions[16].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[16].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[16].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[16].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.4
      {
        question_id: questions[17].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[17].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[17].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[17].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.5
      {
        question_id: questions[18].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[18].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[18].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[18].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.1.6
      {
        question_id: questions[19].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[19].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[19].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[19].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.2.1
      {
        question_id: questions[20].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[20].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[20].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[20].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.2.2
      {
        question_id: questions[21].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[21].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[21].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[21].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL2章 2.2.3
      {
        question_id: questions[22].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[22].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[22].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[22].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.1.1
      {
        question_id: questions[23].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[23].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[23].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[23].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.1.2
      {
        question_id: questions[24].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[24].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[24].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[24].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.1.3
      {
        question_id: questions[25].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[25].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[25].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[25].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.1
      {
        question_id: questions[26].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[26].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[26].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[26].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.2
      {
        question_id: questions[27].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[27].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[27].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[27].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.3
      {
        question_id: questions[28].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[28].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[28].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[28].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.4
      {
        question_id: questions[29].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[29].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[29].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[29].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL3章 3.2.5
      {
        question_id: questions[30].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[30].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[30].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[30].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.1.1
      {
        question_id: questions[31].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[31].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[31].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[31].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.1
      {
        question_id: questions[32].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[32].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[32].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[32].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.2
      {
        question_id: questions[33].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[33].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[33].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[33].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.3
      {
        question_id: questions[34].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[34].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[34].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[34].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.2.4
      {
        question_id: questions[35].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[35].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[35].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[35].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.3.1
      {
        question_id: questions[36].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[36].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[36].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[36].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.3.2
      {
        question_id: questions[37].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[37].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.3.3
      {
        question_id: questions[38].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[38].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[38].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[38].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.4.1
      {
        question_id: questions[39].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[39].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[39].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[39].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.4.2
      {
        question_id: questions[40].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[40].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[40].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[40].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.4.3
      {
        question_id: questions[41].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[41].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[41].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[41].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.5.1
      {
        question_id: questions[42].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[42].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[42].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[42].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.5.2
      {
        question_id: questions[43].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[43].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[43].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[43].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL4章 4.5.3
      {
        question_id: questions[44].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[44].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[44].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[44].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.1
      {
        question_id: questions[45].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[45].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[45].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[45].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.2
      {
        question_id: questions[46].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[46].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[46].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[46].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.3
      {
        question_id: questions[47].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[47].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[47].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[47].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.4
      {
        question_id: questions[48].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[48].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[48].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[48].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.5
      {
        question_id: questions[49].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[49].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[49].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[49].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.6
      {
        question_id: questions[50].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[50].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[50].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[50].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.1.7
      {
        question_id: questions[51].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[51].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[51].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[51].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.1
      {
        question_id: questions[52].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[52].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[52].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[52].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.2
      {
        question_id: questions[53].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[53].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[53].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[53].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.3
      {
        question_id: questions[54].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[54].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[54].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[54].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.2.4
      {
        question_id: questions[55].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[55].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[55].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[55].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.3.1
      {
        question_id: questions[56].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[56].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[56].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[56].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.3.2
      {
        question_id: questions[57].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[57].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[57].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[57].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL5章 5.3.3
      {
        question_id: questions[58].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[58].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[58].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[58].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL6章 6.1.1
      {
        question_id: questions[59].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[59].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[59].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[59].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // JSTQB-FL6章 6.2.1
      {
        question_id: questions[60].id,
        choice_text: 'AAA',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[60].id,
        choice_text: 'BBB',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[60].id,
        choice_text: 'CCC',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[60].id,
        choice_text: 'DDD',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
