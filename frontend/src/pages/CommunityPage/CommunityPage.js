import React from 'react';
import { Link } from 'react-router-dom';
import './CommunityPage.css';

const CommunityPage = () => {
  const posts = [
    { id: 1, title: 'ポストタイトル1', author: 'ユーザー1', date: '2023-06-01', commentCount: 2 },
    { id: 2, title: 'ポストタイトル2', author: 'ユーザー2', date: '2023-06-02', commentCount: 0 },
    { id: 3, title: 'ポストタイトル3', author: 'ユーザー3', date: '2023-06-03', commentCount: 5 },
  ];

  return (
    <div className="community-page">
      <h1>コミュニティ</h1>
      <Link to="/community/create" className="create-post-button">
        ポストを作成する
      </Link>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>
              作成者: {post.author} | 日付: {post.date} | コメント数: {post.commentCount}
            </p>
            <Link to={`/community/${post.id}`}>詳細を見る</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;