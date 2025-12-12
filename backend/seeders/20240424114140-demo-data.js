'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedAdminPassword = await bcryptjs.hash('adminpassword', 10);
    const hashedPaidPassword = await bcryptjs.hash('paidpassword', 10);
    const hashedFreePassword = await bcryptjs.hash('freepassword', 10);

    // Userデータの挿入
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


    // Categoryデータの挿入
    await queryInterface.bulkInsert('Categories', [
      {
        name: '分野1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '分野2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '分野3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Subcategoryデータの挿入
    await queryInterface.bulkInsert('Subcategories', [
      {
        category_id: 1,
        name: '科目1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        name: '科目2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        name: '科目3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        name: '科目4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        name: '科目5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        name: '科目6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Questionデータの挿入
    await queryInterface.bulkInsert('Questions', [
      {
        category_id: 1,
        subcategory_id: 1,
        title: 'FL問題1',
        statement: '問題: ソフトウェア開発においてテストが必要な主な理由は何ですか？',
        difficulty: 'easy',
        access_level: 'unauthorized',
        explanation: '解説: テストは欠陥を早期に検出し、修正することでソフトウェアの品質を保証し、最終的な製品の信頼性を高めるために不可欠です。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        subcategory_id: 2,
        title: 'FL問題2',
        statement: '問題: テストプロセスが開発サイクルにおいて果たす役割は何ですか？',
        difficulty: 'medium',
        access_level: 'unauthorized',
        explanation: '解説: テストプロセスは、ソフトウェアの欠陥を特定し、修正することにより、製品の品質を向上させ、ユーザーの満足度を確保します。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        subcategory_id: 3,
        title: 'TA問題1',
        statement: '問題: テスト活動がプロジェクトのどの段階で開始されるべきですか？',
        difficulty: 'hard',
        access_level: 'free',
        explanation: '解説: 要件定義フェーズの開始時にテスト活動を開始することで、要件の誤解や欠落を早期に発見し、開発コストの削減やプロジェクトの成功率を高めることができます。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        subcategory_id: 4,
        title: 'TA問題2',
        statement: '問題: テストの実施によって達成できないことは何ですか？',
        difficulty: '1節',
        access_level: 'free',
        explanation: '解説: テストによってソフトウェアの完全な正確性を証明することは不可能です。テストは欠陥を検出し、潜在的な問題を特定する手段ですが、ソフトウェアが絶対に正しいことを保証するものではありません。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        subcategory_id: 5,
        title: 'TM問題1',
        statement: '問題: テスト自動化の主な利点は何ですか？',
        difficulty: '2節',
        access_level: 'paid',
        explanation: '解説: テスト自動化は、繰り返し実行されるテストの効率と正確性を向上させることができます。これにより、手動テストでは時間がかかる反復的なタスクを迅速に実行し、テストカバレッジを拡大することが可能になります。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        subcategory_id: 6,
        title: 'TM問題2',
        statement: '問題: 統合テストの実施目的は何ですか？',
        difficulty: '3節',
        access_level: 'paid',
        explanation: '解説: 統合テストは、異なるモジュール間のインターフェースや相互作用に焦点を当て、これらの部分が互いに正しく連携して機能するかを確認するために実施されます。これにより、モジュール間の統合に関する問題を早期に特定し、修正することができます。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        subcategory_id: 6,
        title: 'TM問題3',
        statement: 'ある金融機関が新しいオンラインバンキングシステムの導入を計画しています。このシステムは、顧客に対してより効率的で安全な金融取引を提供することを目的としています。プロジェクトチームは、ソフトウェアの品質を保証し、運用環境での故障リスクを最小限に抑えるために、綿密なテストプロセスを実施する必要があります。テストプロセスには、要件のレビューから始まり、テスト計画、テストケースの設計、実装、テストの実行、そしてテスト結果の分析と報告が含まれます。また、テストは、ソフトウェアが指定された要件を満たしているかどうかの検証に加えて、システムがユーザーのニーズを満たしているかどうかの妥当性確認も行います。このプロセスを通じて、テストチームは、ソフトウェアの品質に対する信頼を構築し、ステークホルダーがシステムの品質レベルに関して意志決定を行うのに役立つ情報を提供することができます。以下の選択肢の中で、テストプロセスの説明として最も正確なものはどれでしょうか？',
        difficulty: 'K2',
        access_level: 'admin',
        explanation: '正解のBは、テストが単にソフトウェアを実行して結果を確認するだけのプロセスではなく、より広範な活動を含むプロセスであることを正確に反映しています。テストプロセスは、要件の検証と妥当性確認から始まり、テスト対象の品質評価に至るまでの一連のステップを含みます。このプロセスは、ソフトウェアの品質を保証し、運用環境での故障リスクを最小限に抑えるために不可欠です。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        subcategory_id: 6,
        title: 'TM問題4',
        statement: 'テスト活動を実施する際に追求される共通の目標の一つとして不適切なものを選びなさい。テストの基本的な目的は品質の確認とリスクの識別にありますが、以下の選択肢の中でテストの本質的な目的と一致しないものはどれでしょうか？',
        difficulty: 'k3',
        access_level: 'admin',
        explanation: '選択肢A「システムの性能を最適化するためのアプローチを特定する。」は、テストに共通する目的として適切でないものです。テストの主要な目的は、システム内の故障や欠陥を特定し報告すること、ステークホルダーに重要な品質情報を提供すること、および製品が特定の規制や標準に準拠しているかを検証することにあります。性能最適化は、テストから得られる情報を基に行われることがありますが、テスト自体の目的ではありません。むしろ、性能テストはシステムの性能基準を確認するもので、最適化自体を目的とするものではありません。選択肢B、C、およびDは、テストの主な目的を正しく反映しています。テストは欠陥の発見、品質情報の提供、および規制や標準への準拠確認を目的としており、これらはテストを通じて達成されるべき主要な目標です。したがって、テスト活動において共通し追求される目標として不適切な選択肢はAです。これは、テストの基本的な目的と直接的に関連しない活動を指しています。',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // 挿入された問題のIDを取得
    const questions = await queryInterface.sequelize.query(
      "SELECT id FROM Questions",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // question_choicesの挿入
    await queryInterface.bulkInsert('question_choices', [
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
      {
        question_id: questions[1].id,
        choice_text: 'A. ドキュメントの品質を向上させる',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'B. エンドユーザーの満足度を確保する',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'C. 開発プロセスの効率化',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[1].id,
        choice_text: 'D. ソフトウェアの欠陥を特定し、修正する',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 問題3までの選択肢
      {
        question_id: questions[2].id,
        choice_text: '問題3の選択肢1',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: '問題3の選択肢2',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: '問題3の選択肢3',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[2].id,
        choice_text: '問題3の選択肢4',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 問題4までの選択肢
      {
        question_id: questions[3].id,
        choice_text: '問題4の選択肢1',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[3].id,
        choice_text: '問題4の選択肢2',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[3].id,
        choice_text: '問題4の選択肢3',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[3].id,
        choice_text: '問題4の選択肢4',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 問題5までの選択肢
      {
        question_id: questions[4].id,
        choice_text: '問題5の選択肢1',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[4].id,
        choice_text: '問題5の選択肢2',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[4].id,
        choice_text: '問題5の選択肢3',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[4].id,
        choice_text: '問題5の選択肢4',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 問題6までの選択肢
      {
        question_id: questions[5].id,
        choice_text: '問題6の選択肢1',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[5].id,
        choice_text: '問題6の選択肢2',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[5].id,
        choice_text: '問題6の選択肢3',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[5].id,
        choice_text: '問題6の選択肢4',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ...
      // 問題7までの選択肢
      {
        question_id: questions[6].id,
        choice_text: 'A. テストは、ソフトウェアがユーザーの期待に応えるための機能と性能を持っていることを確認するプロセスです。',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[6].id,
        choice_text: 'B. テストプロセスには、テスト計画、分析、設計、実装、テスト進捗と結果の報告、テスト対象の品質評価が含まれます。',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[6].id,
        choice_text: 'C. テストの主な目的は、システムがユーザーのニーズを満たし、指定された要件に従って機能することを保証することです。',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[6].id,
        choice_text: 'D. ソフトウェアテストは、開発プロセスの中で唯一、未発見の問題を特定し、解決する手段を提供します。',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ...
      // 問題8までの選択肢
      {
        question_id: questions[7].id,
        choice_text: 'A.システムの性能を最適化するためのアプローチを特定する。',
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[7].id,
        choice_text: 'B.システム内の故障や欠陥を特定し、報告する。',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[7].id,
        choice_text: 'C.プロジェクトステークホルダーに、テスト対象の品質に関する重要な情報を提供し、意思決定を支援する。',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question_id: questions[7].id,
        choice_text: 'D.製品が規制、標準、およびその他のビジネス要件を満たしているかどうかを検証する。',
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // ... 他の選択肢データ ...
    ]);

    // PostCommentデータの挿入
    await queryInterface.bulkInsert('PostComments', [
      {
        user_id: 1,
        content: 'コメント1の内容',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        content: 'コメント2の内容',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        content: 'コメント3の内容',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PostComments', null, {});
    await queryInterface.bulkDelete('question_choices', null, {}); // 追加
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Subcategories', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
