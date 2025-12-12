import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage/LoginPage';

describe('LoginPage UIコンポーネントテスト', () => {
  // 各テストの前に実行される共通のセットアップ
  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  // 1. 初期表示テスト
  test('ログインページの初期表示が正しい', () => {
    renderLoginPage();

    // 見出しの確認
    expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument();

    // Googleログインボタンの確認
    expect(screen.getByText('Agestアカウント でログイン')).toBeInTheDocument();

    // 警告メッセージの確認
    expect(screen.getByText('未ログインでは解答できません')).toBeInTheDocument();
  });

  // 2. フォーム要素の存在確認テスト
  test('管理者ログインフォームの要素が正しく表示される', () => {
    renderLoginPage();

    // 管理者ログインセクションを開く
    fireEvent.click(screen.getByText('▼管理用ログイン'));

    // 入力フィールドの確認
    expect(screen.getByLabelText('メールアドレス:')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード:')).toBeInTheDocument();

    // ログインボタンの確認
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  // 3. 入力バリデーションテスト
  test('空の入力フィールドでフォーム送信するとエラーが表示される', async () => {
    renderLoginPage();

    // 管理者ログインセクションを開く
    fireEvent.click(screen.getByText('▼管理用ログイン'));

    // 空のフォームを送信
    const submitButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.click(submitButton);

    // HTML5のバリデーションメッセージを確認
    const emailInput = screen.getByLabelText('メールアドレス:');
    expect(emailInput).toBeInvalid();
    expect(emailInput).toHaveAttribute('required');
  });

  // 4. パスワード表示切り替えテスト（パスワード表示機能がある場合）
  test('パスワードの表示/非表示が切り替えられる', () => {
    renderLoginPage();

    // 管理者ログインセクションを開く
    fireEvent.click(screen.getByText('▼管理用ログイン'));

    const passwordInput = screen.getByLabelText('パスワード:');
    expect(passwordInput).toHaveAttribute('type', 'password');

    // パスワード表示ボタンがある場合の処理
    if (screen.queryByRole('button', { name: 'パスワードを表示' })) {
      fireEvent.click(screen.getByRole('button', { name: 'パスワードを表示' }));
      expect(passwordInput).toHaveAttribute('type', 'text');
    }
  });

  // 5. フォームの入力状態テスト
  test('フォームに入力できる', () => {
    renderLoginPage();

    // 管理者ログインセクションを開く
    fireEvent.click(screen.getByText('▼管理用ログイン'));

    // メールアドレス入力
    const emailInput = screen.getByLabelText('メールアドレス:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    // パスワード入力
    const passwordInput = screen.getByLabelText('パスワード:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  // 6. 管理者ログインセクションの開閉テスト
  test('管理者ログインセクションの開閉が正しく動作する', () => {
    renderLoginPage();

    // 初期状態では管理者ログインフォームは非表示
    const emailInput = screen.queryByLabelText('メールアドレス:');
    expect(emailInput).not.toBeInTheDocument();

    // セクションを開く
    fireEvent.click(screen.getByText('▼管理用ログイン'));
    expect(screen.getByLabelText('メールアドレス:')).toBeInTheDocument();
  });
});
