const { Question, Category, Subcategory, QuestionChoice, UserAnswer, sequelize } = require('../models');
const { Sequelize } = require('sequelize');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');  // 通常版のfsを使用
const fsSync = require('fs');       // 同期版のfsも使用
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// 問題一覧の取得
exports.getQuestions = async (req, res) => {
  try {
    const { access_level, category, subcategory, difficulty, status } = req.query;
    const userId = req.userId;
    console.log('User ID:', userId);
    const where = {};

    if (access_level) {
      where.access_level = access_level.split(',');
    }
    if (category) {
      where.category_id = category;
    }
    if (subcategory) {
      where.subcategory_id = subcategory;
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }

    let includeUserAnswers = {
      model: UserAnswer,
      as: 'UserAnswers',
      required: false,
      where: userId ? { user_id: userId } : {},
      attributes: ['is_correct']
    };

    if (status === 'correct') {
      includeUserAnswers.where.is_correct = true;
      includeUserAnswers.required = true;
    } else if (status === 'incorrect') {
      includeUserAnswers.required = true;
    } else if (status === 'unattempted') {
      includeUserAnswers.required = false;
    }

    const questions = await Question.findAll({
      where,
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Subcategory, attributes: ['id', 'name'] },
        includeUserAnswers
      ],
      attributes: ['id', 'title', 'difficulty', 'access_level', 'category', 'subcategory']
    });

    const questionsWithStatus = questions.map(question => {
      const userAnswers = question.UserAnswers || [];
      let questionStatus = '未着手';
      if (userAnswers.length > 0) {
        questionStatus = userAnswers.some(answer => answer.is_correct) ? '正解' : '不正解';
      }
      return {
        ...question.toJSON(),
        status: userId ? questionStatus : undefined
      };
    });


    // Filter questions based on status
    const filteredQuestions = status
      ? questionsWithStatus.filter(q => {
        if (status === 'correct') return q.status === '正解';
        if (status === 'incorrect') return q.status === '不正解';
        if (status === 'unattempted') return q.status === '未着手';
        return true;
      })
      : questionsWithStatus;

    const [categories, subcategories, difficulties] = await Promise.all([
      Category.findAll({ attributes: ['id', 'name'] }),
      Subcategory.findAll({ attributes: ['id', 'name', 'category_id'] }),
      Question.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('difficulty')), 'difficulty']],
        raw: true
      }).then(difficulties => difficulties.map(d => d.difficulty))
    ]);

    res.status(200).json({
      questions: filteredQuestions,
      categories,
      subcategories,
      difficulties
    });
  } catch (error) {
    console.error('Error in getQuestions:', error);
    res.status(500).json({ message: 'サーバーエラー', error: error.message });
  }
};

// 問題の詳細情報の取得
exports.getQuestionById = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findByPk(questionId, {
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Subcategory, attributes: ['id', 'name'] },
        { model: QuestionChoice, as: 'QuestionChoices', attributes: ['id', 'choice_text', 'is_correct'] },
      ],
      attributes: ['id', 'category_id', 'subcategory_id', 'title', 'statement', 'difficulty', 'access_level', 'explanation', 'image_url'],
    });
    if (!question) {
      return res.status(404).json({ message: '問題が見つかりません' });
    }

    // アクセス権限チェック
    const userRole = req.userRole || 'unauthorized';
    const accessLevels = {
      'unauthorized': ['unauthorized'],
      'free': ['unauthorized', 'free'],
      'paid': ['unauthorized', 'free', 'paid'],
      'admin': ['unauthorized', 'free', 'paid', 'admin']
    };

    if (!accessLevels[userRole]?.includes(question.access_level)) {
      return res.status(403).json({ message: 'この問題にアクセスする権限がありません' });
    }



    console.log('Question data:', question.toJSON()); // デバッグ用ログ
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// 新しい問題の作成
exports.createQuestion = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const { category, subcategory, title, statement, difficulty, access_level, explanation, choices } = req.body;

    // choices のパース処理
    let parsedChoices;
    try {
      parsedChoices = typeof choices === 'string' ? JSON.parse(choices) : choices;
      if (!Array.isArray(parsedChoices)) {
        throw new Error('Choices must be an array');
      }
      if (parsedChoices.length === 0) {
        throw new Error('At least one choice is required');
      }
      if (!parsedChoices.some(choice => choice.is_correct)) {
        throw new Error('At least one choice must be marked as correct');
      }
    } catch (parseError) {
      await transaction.rollback();
      return res.status(400).json({
        message: 'Invalid choices format',
        error: parseError.message,
        receivedChoices: choices
      });
    }

    // 画像URL処理
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/api/uploads/${req.file.filename}`; // /api/uploads プレフィックスを追加
    }

    // カテゴリ処理
    let categoryInstance = await Category.findOne({
      where: { name: category },
      transaction
    });

    if (!categoryInstance) {
      categoryInstance = await Category.create(
        { name: category },
        { transaction }
      );
    }

    // サブカテゴリ処理
    let subcategoryInstance = await Subcategory.findOne({
      where: {
        name: subcategory,
        category_id: categoryInstance.id
      },
      transaction
    });

    if (!subcategoryInstance) {
      subcategoryInstance = await Subcategory.create({
        name: subcategory,
        category_id: categoryInstance.id
      }, { transaction });
    }

    // 問題作成
    const question = await Question.create({
      category_id: categoryInstance.id,
      subcategory_id: subcategoryInstance.id,
      category: categoryInstance.name,
      subcategory: subcategoryInstance.name,
      title,
      statement,
      difficulty,
      access_level,
      explanation,
      image_url: imageUrl
    }, { transaction });

    // 選択肢作成
    await Promise.all(parsedChoices.map(choice =>
      QuestionChoice.create({
        question_id: question.id,
        choice_text: choice.choice_text,
        is_correct: choice.is_correct
      }, { transaction })
    ));

    // トランザクションのコミット
    await transaction.commit();

    // 関連データを含めて問題を取得
    const createdQuestion = await Question.findByPk(question.id, {
      include: [
        { model: QuestionChoice, as: 'QuestionChoices' },
        { model: Category },
        { model: Subcategory }
      ]
    });

    res.status(201).json(createdQuestion);

  } catch (error) {
    // トランザクションのロールバック
    if (transaction) await transaction.rollback();

    // 画像ファイルの削除
    if (req.file) {
      try {
        const filePath = path.join(__dirname, '..', 'uploads/images', req.file.filename);
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }

    console.error('Error creating question:', error);
    res.status(500).json({
      message: 'サーバーエラー',
      error: error.message,
      details: {
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

// 問題の更新
exports.updateQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findByPk(questionId, {
      include: [{ model: QuestionChoice, as: 'QuestionChoices' }]
    });

    if (!question) {
      return res.status(404).json({ message: '問題が見つかりません' });
    }

    // Form-dataからデータを取得
    const { categoryId, subcategoryId, title, statement, difficulty, access_level, explanation } = req.body;

    // 選択肢データのパース
    let choices;
    try {
      choices = JSON.parse(req.body.choices);
      if (!Array.isArray(choices)) {
        throw new Error('選択肢は配列である必要があります');
      }
    } catch (error) {
      console.error('Error parsing choices:', error);
      return res.status(400).json({ message: '選択肢データの形式が不正です' });
    }

    // アクセスレベルのバリデーション
    const validAccessLevels = ['unauthorized', 'free', 'paid', 'admin'];
    if (!validAccessLevels.includes(access_level)) {
      return res.status(400).json({ message: '無効なアクセスレベルです' });
    }

    // 画像処理
    let imageUrl = question.image_url;
    if (req.file) {
      // 古い画像があれば削除
      if (question.image_url) {
        try {
          const oldImagePath = path.join(__dirname, '..', question.image_url.replace('/api', ''));
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
      imageUrl = `/api/uploads/${req.file.filename}`;
    } else if (req.body.deleteImage === 'true') {
      // 画像の削除が要求された場合
      if (question.image_url) {
        try {
          const imagePath = path.join(__dirname, '..', question.image_url.replace('/api', ''));
          await fs.unlink(imagePath);
        } catch (err) {
          console.error('Error deleting image:', err);
        }
      }
      imageUrl = null;
    }

    // 問題の更新
    await question.update({
      category_id: categoryId,
      subcategory_id: subcategoryId,
      title,
      statement,
      difficulty,
      access_level,
      explanation,
      image_url: imageUrl
    });

    // 選択肢の更新
    await QuestionChoice.destroy({ where: { question_id: questionId } });

    if (choices && choices.length > 0) {
      await Promise.all(choices.map(choice =>
        QuestionChoice.create({
          question_id: questionId,
          choice_text: choice.choice_text,
          is_correct: choice.is_correct
        })
      ));
    }

    // 更新後の問題を取得して返す
    const updatedQuestion = await Question.findByPk(questionId, {
      include: [{ model: QuestionChoice, as: 'QuestionChoices' }]
    });

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({
      message: 'サーバーエラー',
      error: error.message
    });
  }
};

// 問題の削除
exports.deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: '問題が見つかりません' });
    }
    await question.destroy();

    // カテゴリとサブカテゴリに他の問題が存在するかチェック
    const categoryHasQuestions = await Question.findOne({ where: { category_id: question.category_id } });
    const subcategoryHasQuestions = await Question.findOne({ where: { subcategory_id: question.subcategory_id } });

    if (!categoryHasQuestions) {
      // カテゴリに問題がなくなった場合、カテゴリを削除
      await Category.destroy({ where: { id: question.category_id } });
    }
    if (!subcategoryHasQuestions) {
      // サブカテゴリに問題がなくなった場合、サブカテゴリを削除
      await Subcategory.destroy({ where: { id: question.subcategory_id } });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// ロールに基づいた問題取得
exports.getQuestionsByRole = async (req, res) => {
  const userRole = req.userRole;
  try {
    let questions;
    if (userRole === 'admin') {
      questions = await Question.findAll({
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Subcategory, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'title', 'difficulty']
      });
    } else if (userRole === 'paid') {
      questions = await Question.findAll({
        where: {
          difficulty: ['easy', 'medium']
        },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Subcategory, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'title', 'difficulty']
      });
    } else {
      questions = await Question.findAll({
        where: {
          difficulty: 'easy'
        },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Subcategory, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'title', 'difficulty']
      });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// カテゴリに基づいた問題取得
exports.getQuestionsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const questions = await Question.findAll({
      where: {
        category_id: categoryId
      },
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Subcategory, attributes: ['id', 'name'] }
      ],
      attributes: ['id', 'title', 'difficulty']
    });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

exports.getDifficulties = async (req, res) => {
  try {
    const difficulties = await Question.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('difficulty')), 'difficulty']],
      raw: true
    });
    res.status(200).json(difficulties.map(d => d.difficulty));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

exports.getUniqueCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      group: ['name']
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

exports.getUniqueSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      attributes: ['id', 'name', 'category_id'],
      group: ['name', 'category_id']
    });
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};



exports.createQuestionFromCsvRow = async (row, transaction) => {
  console.log('Processing row:', row);  // デバッグ用ログ

  const {
    category,
    subcategory,
    title,
    statement,
    difficulty,
    access_level,
    explanation,
    choice1,
    choice2,
    choice3,
    choice4,
    correct_choice
  } = row;

  if (!category || !subcategory) {
    console.error('Invalid category or subcategory:', row);
    throw new Error('Invalid category or subcategory');
  }

  let categoryInstance = await Category.findOne({
    where: { name: category.trim() },
    transaction
  });

  if (!categoryInstance) {
    categoryInstance = await Category.create(
      { name: category.trim() },
      { transaction }
    );
  }

  let subcategoryInstance = await Subcategory.findOne({
    where: {
      name: subcategory.trim(),
      category_id: categoryInstance.id
    },
    transaction
  });

  if (!subcategoryInstance) {
    subcategoryInstance = await Subcategory.create({
      name: subcategory.trim(),
      category_id: categoryInstance.id
    }, { transaction });
  }

  const question = await Question.create({
    category_id: categoryInstance.id,
    subcategory_id: subcategoryInstance.id,
    category: category.trim(),
    subcategory: subcategory.trim(),
    title,
    statement,
    difficulty,
    access_level,
    explanation
  }, { transaction });

  // 選択肢を配列として定義
  const choices = [
    { index: 1, text: choice1 },
    { index: 2, text: choice2 },
    { index: 3, text: choice3 },
    { index: 4, text: choice4 }
  ];

  // 選択肢を逐次的に作成
  for (const choice of choices) {
    await QuestionChoice.create({
      question_id: question.id,
      choice_text: choice.text,
      is_correct: parseInt(correct_choice) === choice.index
    }, { transaction });
  }

  return question;
};



exports.uploadQuestionsCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const results = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csv({
          separator: ',',
          headers: [
            'category',
            'subcategory',
            'title',
            'statement',
            'difficulty',
            'access_level',
            'explanation',
            'choice1',
            'choice2',
            'choice3',
            'choice4',
            'correct_choice'
          ],
          skipLines: 1 // ヘッダー行をスキップ
        }))
        .on('data', (data) => {
          // 空行をスキップ
          if (Object.values(data).some(value => value)) {
            results.push(data);
          }
        })
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    console.log('Parsed CSV data:', results);

    // トランザクションを開始
    const transaction = await sequelize.transaction();

    try {
      for (const row of results) {
        await exports.createQuestionFromCsvRow(row, transaction);
      }

      await transaction.commit();

      // 一時ファイルを削除
      await fs.promises.unlink(req.file.path);

      res.status(200).json({
        message: 'Questions uploaded successfully',
        count: results.length
      });

    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Error processing CSV:', error);
    // エラー発生時も一時ファイルを削除
    try {
      await fs.promises.unlink(req.file.path);
    } catch (unlinkError) {
      console.error('Error deleting temporary file:', unlinkError);
    }
    res.status(500).json({
      message: 'Error processing CSV file',
      error: error.message
    });
  }
};


// 画像アップロード処理
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '画像ファイルが選択されていません' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({
      message: '画像が正常にアップロードされました',
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error in uploadImage:', error);
    res.status(500).json({ message: '画像のアップロードに失敗しました' });
  }
};
