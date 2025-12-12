// controllers/userAnswerController.js
const { UserAnswer, QuestionChoice } = require('../models');

exports.saveUserAnswer = async (req, res) => {
  const { questionId, choiceId } = req.body;
  const userId = req.userId;

  try {
    const choice = await QuestionChoice.findByPk(choiceId);
    if (!choice) {
      return res.status(404).json({ message: '選択肢が見つかりません' });
    }

    const userAnswer = await UserAnswer.create({
      user_id: userId,
      question_id: questionId,
      selected_choice_id: choiceId,
      is_correct: choice.is_correct
    });

    res.status(201).json(userAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
