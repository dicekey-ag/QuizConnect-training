module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    category_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subcategories',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statement: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('statement');
        return rawValue ? rawValue.replace(/\\n/g, '\n') : '';
      },
      set(value) {
        this.setDataValue('statement', value.replace(/\n/g, '\\n'));
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('image_url');
        // スラッシュの重複を防ぎ、nullチェックを追加
        if (!rawValue || rawValue === 'null') return null;
        return `/api/uploads/${rawValue.replace(/^\/+/, '')}`;
      },
      set(value) {
        if (!value || value === 'null') {
          this.setDataValue('image_url', null);
          return;
        }
        if (typeof value === 'string') {
          // ファイル名のみを保存
          const fileName = value
            .replace(/^\/+/, '')
            .replace(/^uploads\//, '')
            .replace(/^api\/uploads\//, '');
          this.setDataValue('image_url', fileName);
        } else {
          this.setDataValue('image_url', value);
        }
      }
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard', 'K1', 'K2', 'K3', 'K4'),
      allowNull: false
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('explanation');
        return rawValue ? rawValue.replace(/\\n/g, '\n') : '';
      },
      set(value) {
        this.setDataValue('explanation', value ? value.replace(/\n/g, '\\n') : null);
      }
    },
    access_level: {
      type: DataTypes.ENUM('unauthorized', 'free', 'paid', 'admin'),
      allowNull: false,
      defaultValue: 'unauthorized'  // デフォルト値を 'unauthorized' に設定
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Category, { foreignKey: 'category_id' });
    Question.belongsTo(models.Subcategory, { foreignKey: 'subcategory_id' });
    Question.hasMany(models.QuestionChoice, {
      foreignKey: 'question_id',
      as: 'QuestionChoices'
    });
    Question.hasMany(models.UserAnswer, {
      foreignKey: 'question_id',
      as: 'UserAnswers'  // この行を確認
    });
  };

  return Question;
};
