import api from './index';

export const getSubcategories = async () => {
  try {
    const response = await api.get('/subcategories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch subcategories');
  }
};