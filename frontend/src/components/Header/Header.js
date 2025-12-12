import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      // 現在のページと同じパスの場合、ページをリロード
      window.location.reload();
    } else {
      // 異なるパスの場合、通常のナビゲーション
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={() => handleNavigation('/')}>Quiz Connect</Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>
      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => handleNavigation('/')}>ホーム</Link>
          </li>
          <li>
            <Link to="/questions" onClick={() => handleNavigation('/questions')}>問題一覧</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => handleNavigation('/dashboard')}>ダッシュボード</Link>
              </li>
              <li>
                <button onClick={handleLogout}>ログアウト</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => handleNavigation('/login')}>ログイン</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
