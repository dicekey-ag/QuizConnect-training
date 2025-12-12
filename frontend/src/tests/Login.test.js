import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage/LoginPage';
import * as authApi from '../api/auth';

// APIモックの設定
jest.mock('../api/auth');

describe('LoginPage認証テスト', () => {
  // スタブの例：ログイン成功のテスト
  test('正しい認証情報でログインが成功する', async () => {
    // スタブの準備：固定の成功レスポンスを返す
    authApi.login.mockResolvedValue({
      token: 'test-token',
      role: 'admin',
      username: 'testuser'
    });

    const { getByLabelText, getByText, getByRole } = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // 管理者ログインセクションを開く
    fireEvent.click(getByText('▼管理用ログイン'));

    // フォームに値を入力
    fireEvent.change(getByLabelText('メールアドレス:'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(getByLabelText('パスワード:'), {
      target: { value: 'password123' }
    });

    // ボタンを役割で特定して送信
    const submitButton = getByRole('button', { name: 'ログイン' });
    fireEvent.click(submitButton);

    // ログイン関数が正しい値で呼ばれたことを確認
    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  // スパイの例：ログインエラーの監視
  test('無効な認証情報でログインが失敗する', async () => {
    // スパイの設定：エラーをスローするモック
    const consoleSpy = jest.spyOn(console, 'error');
    authApi.login.mockRejectedValue(new Error('ログイン失敗'));

    const { getByLabelText, getByText, getByRole } = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // 管理者ログインセクションを開く
    fireEvent.click(getByText('▼管理用ログイン'));

    // 無効な認証情報を入力
    fireEvent.change(getByLabelText('メールアドレス:'), {
      target: { value: 'invalid@example.com' }
    });
    fireEvent.change(getByLabelText('パスワード:'), {
      target: { value: 'wrongpassword' }
    });

    // ボタンを役割で特定して送信
    const submitButton = getByRole('button', { name: 'ログイン' });
    fireEvent.click(submitButton);

    // エラーメッセージとコンソールエラーの確認
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(getByText('ログインに失敗しました')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
