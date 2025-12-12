import React, { createContext, useState, useEffect, useContext } from 'react';
import { setAuthToken } from '../api';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null); // usernameステートを追加
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const response = await api.get('/users/profile');
          setIsAuthenticated(true);
          setRole(response.data.role);
          setUsername(response.data.username); // レスポンスからユーザー名を設定
        } catch (error) {
          console.error('Error checking authentication:', error);
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, userRole, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole); // ロールも保存
    localStorage.setItem('username', userName); // ユーザー名を保存
    setAuthToken(token);
    setIsAuthenticated(true);
    setRole(userRole);
    setUsername(userName); // ユーザー名を設定
    console.log('Login context updated:', { userRole, userName }); // デバッグ
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
    setRole(null);
    setUsername(null); // ユーザー名をクリア

    // 追加: ログアウト時に検索設定とランダム設定をクリア
    if (localStorage.getItem('searchParams')) {
      localStorage.removeItem('searchParams');
    }
    if (localStorage.getItem('randomQuestionIds')) {
      localStorage.removeItem('randomQuestionIds');
      localStorage.removeItem('randomQuestionCount');
      localStorage.removeItem('randomQuestions');
      localStorage.removeItem('isRandomMode');
    }
  };

  const updateUserRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, role, username, login, logout, loading, updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
