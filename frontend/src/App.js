import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TopPage from './pages/TopPage/TopPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import QuestionEditPage from './pages/QuestionEditPage/QuestionEditPage';
import QuestionDetailPage from './pages/QuestionDetailPage/QuestionDetailPage';
import CommunityPage from './pages/CommunityPage/CommunityPage';
import AdminPage from './pages/AdminPage/AdminPage';
import LoginPage from './pages/LoginPage/LoginPage';
// import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import QuestionCreatePage from './pages/QuestionCreatePage/QuestionCreatePage';
import UserListPage from './pages/UserListPage/UserListPage';
import OpenSourceLicensesPage from './pages/OpenSourceLicensesPage/OpenSourceLicensesPage';
import './App.css';
import AuthCallback from './pages/AuthCallback';
import GoogleAuthCallback from './pages/GoogleAuthCallback/GoogleAuthCallback';
import './styles/global.css';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/questions/:id/edit" element={<AdminRoute><QuestionEditPage /></AdminRoute>} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/admin/*" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="/admin/questions/create" element={<AdminRoute><QuestionCreatePage /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UserListPage /></AdminRoute>} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
      <Route path="/open-source-licenses" element={<OpenSourceLicensesPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <ScrollToTop /> {/* ScrollToTopコンポーネントを追加 */}
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
