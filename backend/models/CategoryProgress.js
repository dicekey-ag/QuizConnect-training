// models/CategoryProgress.js

module.exports = (sequelize, DataTypes) => {
  const CategoryProgress = sequelize.define('CategoryProgress', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
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

  CategoryProgress.associate = (models) => {
    CategoryProgress.belongsTo(models.User, { foreignKey: 'user_id' });
    CategoryProgress.belongsTo(models.Category, { foreignKey: 'category_id' });
  };

  return CategoryProgress;
};
