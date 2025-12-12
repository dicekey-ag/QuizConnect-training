// controllers/dashboardController.js

const progressService = require('../services/progressService');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;  // authMiddlewareでセットされるはず
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const dashboardData = await progressService.getDashboardData(userId);

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};
