import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './QuestionsPage.css';

const QuestionsPage = ({ userType }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  const categories = ['分野1', '分野2', '分野3'];
  const subjects = ['科目1', '科目2', '科目3', '科目4'];
  const chapters = ['節1', '節2', '節3', '節4', '節5'];

  const questions = [
    { id: 1, category: '分野1', subject: '科目1', chapter: '節1', content: '問題1の内容', status: 'correct', allowedUserTypes: ['free', 'paid', 'admin'] },
    { id: 2, category: '分野2', subject: '科目2', chapter: '節2', content: '問題2の内容', status: 'incorrect', allowedUserTypes: ['paid', 'admin'] },
    { id: 3, category: '分野1', subject: '科目3', chapter: '節3', content: '問題3の内容', status: '', allowedUserTypes: ['free', 'paid', 'admin'] },
    { id: 4, category: '分野3', subject: '科目4', chapter: '節4', content: '問題4の内容', status: 'incorrect', allowedUserTypes: ['admin'] },
  ];

  const filteredQuestions = questions.filter(question =>
    (selectedCategory === '' || question.category === selectedCategory) &&
    (selectedSubject === '' || question.subject === selectedSubject) &&
    (selectedChapter === '' || question.chapter === selectedChapter) &&
    question.allowedUserTypes.includes(userType)
  );

  return (
    <div className="questions-page">
      <h1>問題一覧テスト</h1>
      <div className="category-filter">
        <label>分野：</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">全て</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label>科目：</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">全て</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <label>節：</label>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          <option value="">全て</option>
          {chapters.map(chapter => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
      </div>
      <div className="question-list">
        {filteredQuestions.map(question => (
          <div key={question.id} className="question-item">
            <span className="question-id">{question.id}</span>
            <span className="question-category">{question.category}</span>
            <span className="question-subject">{question.subject}</span>
            <span className="question-chapter">{question.chapter}</span>
            <span className={`solved-mark ${question.status}`}>
              {question.status === 'correct' ? '正解' : question.status === 'incorrect' ? '不正解' : '未解答'}
            </span>

            <Link to={`/questions/${question.id}`}>詳細を見る</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;