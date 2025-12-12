  module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Subcategory.associate = (models) => {
      Subcategory.belongsTo(models.Category, { foreignKey: 'category_id' });
    };
  
    return Subcategory;
  };