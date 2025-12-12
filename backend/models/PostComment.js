module.exports = (sequelize, DataTypes) => {
    const PostComment = sequelize.define('PostComment', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    PostComment.associate = (models) => {
      PostComment.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return PostComment;
  };