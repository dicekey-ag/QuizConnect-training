const { Subcategory } = require('../models');
const { Sequelize } = require('sequelize');

// サブカテゴリ一覧の取得
exports.getSubcategories = async (req, res) => {
    try {
      const subcategories = await Subcategory.findAll({
        attributes: ['id', 'name', 'category_id'],
      });
      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'サーバーエラー' });
    }
  };


exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
        'id',
        'category_id'
      ],
      order: [['name', 'ASC']]
    });
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
