// models/UserProgress.js

module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define('UserProgress', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    answered_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    correct_answers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    incorrect_answers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  UserProgress.associate = (models) => {
    UserProgress.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return UserProgress;
};
