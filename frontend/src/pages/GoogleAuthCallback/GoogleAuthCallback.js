import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (token) {
        try {
          // トークンを使用してユーザー情報を取得
          const response = await api.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = response.data;

          console.log('User data received:', user); // デバッグ用

          // ログインとロールの更新
          // loginに全ての必要な情報を渡す
          login(token, user.role, user.username);



          // ユーザー情報をローカルストレージに保存
          localStorage.setItem('user', JSON.stringify(user));


          navigate('/dashboard');
        } catch (error) {
          console.error('Error fetching user info:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [location, login, navigate]);

  return <div>認証中...</div>;
};

export default GoogleAuthCallback;
