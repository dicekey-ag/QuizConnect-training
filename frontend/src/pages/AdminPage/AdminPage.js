import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('questions');
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setActiveSection(section);
    navigate(`/admin/${section}`);
  };

  return (
    <div className="admin-page">
      <h1>管理者ページ</h1>
      <nav className="admin-navigation">
        <ul>
          <li
            className={activeSection === 'questions' ? 'active' : ''}
            onClick={() => handleSectionClick('questions')}
          >
            問題管理
          </li>
          <li
            className={activeSection === 'users' ? 'active' : ''}
            onClick={() => handleSectionClick('users')}
          >
            ユーザー管理
          </li>
          <li
            className={activeSection === 'content' ? 'active' : ''}
            onClick={() => handleSectionClick('content')}
          >
            コンテンツ管理
          </li>
          <li>
          <Link to="/admin/questions/create">問題作成</Link>
          </li>
          <li>
            <Link to="/admin/users">ユーザー一覧</Link>
          </li>

        </ul>
      </nav>
      <div className="admin-content">
        {/* 選択されたセクションに基づいて、対応するコンポーネントをレンダリング */}
        {activeSection === 'questions' && <QuestionManagement />}
        {activeSection === 'users' && <UserManagement />}
        {activeSection === 'content' && <ContentManagement />}
      </div>
    </div>
  );
};

// 問題管理コンポーネント（仮）
const QuestionManagement = () => {
  return <div>問題管理</div>;
};

// ユーザー管理コンポーネント（仮）
const UserManagement = () => {
  return <div>ユーザー管理</div>;
};

// コンテンツ管理コンポーネント（仮）
const ContentManagement = () => {
  return <div>コンテンツ管理</div>;
};

export default AdminPage;
