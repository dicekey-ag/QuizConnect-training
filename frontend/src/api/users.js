import api from './index';

export const getUsers = async () => {
  try {
    const response = await api.get('/users/all');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// ROLE更新のAPIとやりとり
export const changeUserRole = async (userId, newRole) => {
  try {
    const response = await api.put('/users/change-role', { userId, newRole });
    return response.data;
  } catch (error) {
    throw new Error('Failed to change user role');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
