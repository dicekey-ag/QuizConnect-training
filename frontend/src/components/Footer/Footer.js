import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://sqripts.com/privacy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
            <a href="https://sqripts.com/terms-of-service/" target="_blank" rel="noopener noreferrer">利用規約</a>
            <a href="https://sqripts.com/id_agreement/" target="_blank" rel="noopener noreferrer">ID規約</a>
            <Link to="/open-source-licenses">オープンソースライセンス</Link>
            <p className="footer-text">&copy; 2024 AGEST Quiz Connect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
