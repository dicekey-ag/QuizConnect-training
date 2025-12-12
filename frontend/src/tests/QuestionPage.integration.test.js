import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
// src/tests/QuestionPage.integration.test.js
import * as questionsApi from '../api/questions';  // パスを修正
import QuestionPage from '../pages/QuestionsPage/QuestionsPage';  // パスを修正

// APIのモック
jest.mock('../api/questions');

describe('QuestionPage結合テスト', () => {
  // テストデータ
  const mockQuestions = [
    {
      id: 1,
      title: 'テスト問題1',
      category: '章1',
      subcategory: '1.1',
      difficulty: 'easy',
      status: '未着手'
    },
    {
      id: 2,
      title: 'テスト問題2',
      category: '章2',
      subcategory: '2.1',
      difficulty: 'medium',
      status: '正解'
    }
  ];

  // 基本的な表示テスト
  test('問題一覧が正しく表示される', async () => {
    // APIレスポンスのモック
    questionsApi.getQuestions.mockResolvedValue({
      questions: mockQuestions,
      categories: [],
      subcategories: [],
      difficulties: []
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <QuestionPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // データが読み込まれるのを待つ
    await waitFor(() => {
      expect(screen.getByText('テスト問題1')).toBeInTheDocument();
      expect(screen.getByText('テスト問題2')).toBeInTheDocument();
    });
  });


    // ページテスト
  test.only('ページネーションが正しく動作する', async () => {
    // 11件の問題データを作成（デフォルトの表示件数が10件なので、2ページになる）
    const manyQuestions = Array.from({ length: 11 }, (_, i) => ({
      id: i + 1,
      title: `テスト問題${i + 1}`,
      category: '章1',
      subcategory: '1.1',
      difficulty: 'easy',
      status: '未着手'
    }));

    // APIレスポンスのモック
    questionsApi.getQuestions.mockResolvedValue({
      questions: manyQuestions,
      categories: [],
      subcategories: [],
      difficulties: []
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <QuestionPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // 最初のページの問題が表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('テスト問題1')).toBeInTheDocument();
      expect(screen.getByText('テスト問題10')).toBeInTheDocument();
    });

    // 次のページボタンがあることを確認
    const nextButton = screen.getByText('＞');
    expect(nextButton).toBeInTheDocument();

    // 次のページボタンをクリック
    fireEvent.click(nextButton);

    // 2ページ目の問題が表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('テスト問題11')).toBeInTheDocument();
    });

    // ページ情報が正しく表示されることを確認
    expect(screen.getByText('全11件中 11-11件を表示')).toBeInTheDocument();
  });


  // エラー表示のテスト
  test('APIエラー時にエラーメッセージが表示される', async () => {
    // APIエラーのモック
    questionsApi.getQuestions.mockRejectedValue(
      new Error('データの取得に失敗しました')
    );

    render(
      <BrowserRouter>
        <AuthProvider>
          <QuestionPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText(/検索条件に一致する問題が見つかりませんでした/)).toBeInTheDocument();
    });
  });
});
