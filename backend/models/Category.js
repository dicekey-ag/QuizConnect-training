module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Subcategory, { foreignKey: 'category_id' });
    Category.hasMany(models.Question, { foreignKey: 'category_id' });
  };

  return Category;
};
