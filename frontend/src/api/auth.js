import api, { setAuthToken } from './index';

export const register = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (credentials) => {
  try {
    console.log('Login credentials:', credentials); // credentialsをログ出力
    const response = await api.post('/users/login', credentials);
    // デバッグログ
    console.log('Login response:', response.data);

    if (response.data.token) {
      setAuthToken(response.data.token); // setAuthToken を使用してトークンを設定
    }

    return {
      token: response.data.token,
      role: response.data.role,
      username: response.data.username  // ここを追加
    };
  } catch (error) {
    console.error('Login error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('ログインリクエストに失敗しました');
    }
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/users/refresh-token');
    return response.data.token;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};
