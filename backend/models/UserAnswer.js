module.exports = (sequelize, DataTypes) => {
    const UserAnswer = sequelize.define('UserAnswer', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        }
      },
      selected_choice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'QuestionChoices',
          key: 'id'
        }
      },
      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });

    UserAnswer.associate = (models) => {
      UserAnswer.belongsTo(models.User, { foreignKey: 'user_id' });
      UserAnswer.belongsTo(models.Question, {
        foreignKey: 'question_id',
        as: 'Question'  // この行を追加
      });
      UserAnswer.belongsTo(models.QuestionChoice, { foreignKey: 'selected_choice_id' });
    };

    return UserAnswer;
  };
