// services/progressService.js

const { sequelize, User, Question, UserAnswer, Category } = require('../models');
const { Op } = require('sequelize');

async function getOverallProgress(userId) {
  const totalQuestions = await Question.count();
  const userAnswers = await UserAnswer.findAll({
    where: { user_id: userId },
    include: [{
      model: Question,
      as: 'Question'
    }],
    raw: true,
    nest: true
  });

  const questionMap = new Map();
  let totalAttempts = 0;
  let totalCorrectAttempts = 0;

  userAnswers.forEach(answer => {
    const questionId = answer.question_id;
    if (!questionMap.has(questionId)) {
      questionMap.set(questionId, { correct: false, attempts: 0 });
    }
    const questionData = questionMap.get(questionId);
    questionData.attempts++;
    if (answer.is_correct) {
      questionData.correct = true;
      totalCorrectAttempts++;
    }
    totalAttempts++;
  });

  const answeredQuestions = questionMap.size;
  const uniqueCorrectAnswers = Array.from(questionMap.values()).filter(q => q.correct).length;
  const incorrectAttempts = totalAttempts - totalCorrectAttempts;

  return {
    totalQuestions,
    answeredQuestions,
    remainingQuestions: totalQuestions - answeredQuestions,
    uniqueCorrectAnswers,
    correctAttempts: totalCorrectAttempts,
    incorrectAttempts,
    totalAttempts,
    progressPercentage: (uniqueCorrectAnswers / totalQuestions) * 100
  };
}


// カテゴリ（章）ごとの進捗状況を取得する関数
async function getCategoryProgress(userId) {
  const categories = await Category.findAll({
    include: [{
      model: Question,
      include: [{
        model: UserAnswer,
        as: 'UserAnswers',  // この行を追加
        where: { user_id: userId },
        required: false
      }]
    }]
  });

  return categories.map(category => {
    const totalQuestions = category.Questions.length;
    const questionMap = new Map();
    let totalAttempts = 0;
    let totalCorrectAttempts = 0;

    category.Questions.forEach(question => {
      const questionData = { correct: false, attempts: 0 };
      question.UserAnswers.forEach(answer => {
        questionData.attempts++;
        if (answer.is_correct) {
          questionData.correct = true;
          totalCorrectAttempts++;
        }
        totalAttempts++;
      });
      questionMap.set(question.id, questionData);
    });

    const answeredQuestions = Array.from(questionMap.values()).filter(q => q.attempts > 0).length;
    const uniqueCorrectAnswers = Array.from(questionMap.values()).filter(q => q.correct).length;
    const incorrectAttempts = totalAttempts - totalCorrectAttempts;

    return {
      categoryId: category.id,
      categoryName: category.name,
      totalQuestions,
      answeredQuestions,
      remainingQuestions: totalQuestions - answeredQuestions,
      uniqueCorrectAnswers,
      correctAttempts: totalCorrectAttempts,
      incorrectAttempts,
      totalAttempts,
      progressPercentage: (uniqueCorrectAnswers / totalQuestions) * 100
    };
  });
}

// ダッシュボードデータを生成する関数
async function getDashboardData(userId) {
  try {
    const overallProgress = await getOverallProgress(userId);
    const categoryProgress = await getCategoryProgress(userId);

    return {
      overallProgress,
      categoryProgress
    };
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    throw error;
  }
}

module.exports = {
  getOverallProgress,
  getCategoryProgress,
  getDashboardData
};
