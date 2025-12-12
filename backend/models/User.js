module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.ENUM('admin', 'paid', 'free'),
        allowNull: false,
        defaultValue: 'free'
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      }
    });

  User.associate = (models) => {
    User.hasOne(models.UserProgress, { foreignKey: 'user_id' });
    User.hasMany(models.CategoryProgress, { foreignKey: 'user_id' });
    User.hasMany(models.UserAnswer, { foreignKey: 'user_id' });
  };

    return User;
  };
