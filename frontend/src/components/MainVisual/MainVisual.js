// MainVisual.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainVisual.css';

const MainVisual = () => {
  const information = [
    {
      date: '2024.11',
      text: 'テスト技術者資格制度である、JSTQB-Foundation Level シラバス の 最新Version 2023V4.0.J01 に準拠した試験問題を提供します'
    },
    {
      date: '2024.11',
      text: 'JSTQB-FL(V4.0) 300問を追加'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === information.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, [information.length]);

  return (
    <section className="main-visual">
      <div className="main-visual-content">
        <h1>Quiz Connectへようこそ！</h1>
        <p>
          知識を深め、スキルを向上させ、学習の楽しさを発見しましょう。
          Quiz Connectは、あなたの学習をサポートします。
        </p>

        <div className="main-visual-actions">
          <Link to="/questions" className="btn btn-primary">
            問題に挑戦する
          </Link>
        </div>

        <div className="access-notice">
          <p className="notice-text">
            ※登録ユーザー：全問題閲覧可<br />
            未ログイン：お試し問題のみ（解答不可）
          </p>
        </div>

        <div className="info-slider">
          <div className="info-banner">
            <span className="info-badge">New</span>
            <span className="info-date">{information[currentIndex].date}</span>
            <p className="info-text">{information[currentIndex].text}</p>
            <div className="slider-dots">
              {information.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainVisual;
