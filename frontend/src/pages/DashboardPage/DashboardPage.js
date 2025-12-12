import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../../api';
import './DashboardPage.css';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const DashboardPage = () => {
  const { role, isAuthenticated, loading, username } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getDashboardData();
        if (data && data.overallProgress && data.categoryProgress) {
          setDashboardData(data);
        } else {
          throw new Error('Invalid data structure received from server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`データの取得に失敗しました: ${error.message}`);
        setDashboardData({
          overallProgress: { progressPercentage: 0 },
          categoryProgress: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && !loading) {
      fetchData();
    }
  }, [isAuthenticated, loading]);

  const renderProgressBar = (value, max) => {
    const percentage = (value / max) * 100;
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  const renderRadarChart = () => {
    if (!dashboardData || !dashboardData.categoryProgress) return null;

    const data = {
      labels: dashboardData.categoryProgress.map(category => category.categoryName),
      datasets: [
        {
          label: '進捗率',
          data: dashboardData.categoryProgress.map(category => category.progressPercentage),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    };

    return <Radar data={data} options={options} />;
  };

  if (loading || isLoading) {
    return <div className="dashboard-page"><div className="dashboard-container">Loading...</div></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>ダッシュボード</h1>
          <p>ユーザー：{username || 'ゲスト'}さん</p>
          {role === 'admin' && (
            <Link to="/admin" className="admin-link">
              管理者ページへ
            </Link>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        {!error && !dashboardData && <p>データが利用できません。</p>}

        {dashboardData && (
          <div className="dashboard-content">
            <div className="dashboard-section overall-progress">
              <h2>全体の進捗</h2>
              <div className="progress-details">
                <div className="progress-item">
                  <p>総問題数: {dashboardData.overallProgress.totalQuestions}</p>
                  <p>総解答回数: {dashboardData.overallProgress.totalAttempts}</p>
                </div>
                <div className="progress-item">
                  <p>正解回数: {dashboardData.overallProgress.correctAttempts}</p>
                  <p>不正解回数: {dashboardData.overallProgress.incorrectAttempts}</p>
                </div>
                <div className="progress-item">
                  <p>ユニーク正解数: {dashboardData.overallProgress.uniqueCorrectAnswers}</p>
                </div>
              </div>
              <p>進捗率: {dashboardData.overallProgress?.progressPercentage?.toFixed(2) ?? '0.00'}%</p>
              {renderProgressBar(dashboardData.overallProgress.progressPercentage, 100)}
            </div>

            <div className="dashboard-section radar-chart">
              <h2>章別進捗チャート</h2>
              {renderRadarChart()}
            </div>

            <div className="dashboard-section category-progress">
              <h2>章別の進捗</h2>
              <div className="category-items-container">
                {dashboardData.categoryProgress.map((category) => (
                  <div key={category.categoryId} className="category-item">
                    <h3>{category.categoryName}</h3>
                    <div className="progress-details">
                      <div className="progress-item">
                        <p>総問題数: {category.totalQuestions}</p>
                        <p>総解答回数: {category.totalAttempts}</p>
                      </div>
                      <div className="progress-item">
                        <p>正解回数: {category.correctAttempts}</p>
                        <p>不正解回数: {category.incorrectAttempts}</p>
                      </div>
                      <div className="progress-item">
                        <p>ユニーク正解数: {category.uniqueCorrectAnswers}</p>
                      </div>
                    </div>
                    <p>進捗率: {category.progressPercentage?.toFixed(2) ?? '0.00'}%</p>
                    {renderProgressBar(category.progressPercentage, 100)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* {role === 'admin' && (
          <div className="admin-section">
            <h3>管理者専用セクション</h3>
            <p>管理者向けの機能や情報をここに追加します。</p>
            <Link to="/admin" className="admin-link">
              管理者ページへ
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DashboardPage;
