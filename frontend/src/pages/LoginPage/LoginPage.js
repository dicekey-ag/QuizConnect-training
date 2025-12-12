import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginContext } = useAuth();

  // エラーメッセージがある場合は表示
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('message') === 'expired') {
      setError('ログインしてください(セッションなし)');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log('Login response:', response);
      const { token, role, username } = response;
      console.log('Username from login:', username);
      loginContext(token, role, username);
      navigate(location.state?.from || '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('ログインに失敗しました');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>ログイン</h2>

        {/* エラーメッセージ */}
        {error && (
          <div className="error-message-container">
            <p className="error-message">{error}</p>
          </div>
        )}

        {/* 説明文 */}
        <div className="login-description">
          <p className="login-warning">未ログインでは解答できません</p>
          <p>テストアカウントでログインしてください</p>
        </div>

        {/* ログインフォーム */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">メールアドレス:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">ログイン</button>
        </form>

        {/* テストアカウント情報 */}
        <div className="test-accounts-info">
          <h3>テストアカウント</h3>
          <div className="account-list">
            {/* <div className="account-item">
              <strong>管理者:</strong> admin@example.com / adminpassword
            </div> */}
            <div className="account-item">
              <strong>有料ユーザー:</strong> paid@example.com / paidpassword
            </div>
            <div className="account-item">
              <strong>無料ユーザー:</strong> free@example.com / freepassword
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
