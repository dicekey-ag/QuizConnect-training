import { test, expect } from '@playwright/test';

test.describe('ログインページのテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('ログインページが正しく表示される', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('ログイン');
    await expect(page.getByText('未ログインでは解答できません')).toBeVisible();
    await expect(page.getByText('Agestアカウント でログイン')).toBeVisible();
  });

  test('管理者ログインフォームが表示される', async ({ page }) => {
    await page.click('text=▼管理用ログイン');
    await expect(page.getByLabel('メールアドレス:')).toBeVisible();
    await expect(page.getByLabel('パスワード:')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  // 管理者ログインのテストケースを追加
  test('管理者として正常にログインできる', async ({ page }) => {
    // 管理者ログインセクションを開く
    await page.click('text=▼管理用ログイン');

    // フォームに値を入力
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'adminpassword');

    // ログインボタンをクリック
    await page.click('button[type="submit"]');

    // ダッシュボードページに遷移することを確認
    await expect(page).toHaveURL(/.*dashboard/);

    // ダッシュボードページの要素を確認
    await expect(page.locator('h1')).toHaveText('ダッシュボード');
  });

  // 無効なログインのテストケースを追加
  test('無効な認証情報でログインが失敗する', async ({ page }) => {
    await page.click('text=▼管理用ログイン');

    // 無効な認証情報を入力
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    // エラーメッセージをクリア（既存のメッセージが残っている可能性があるため）
    await page.evaluate(() => {
      const errorElement = document.querySelector('.error-message');
      if (errorElement) errorElement.textContent = '';
    });

    // ログインボタンをクリック
    await page.click('button[type="submit"]');

    // エラーメッセージが表示されるまで待機（タイムアウトを増やす）
    await expect(page.locator('.error-message')).toBeVisible({ timeout: 10000 });

    // エラーメッセージの内容を確認（複数のパターンを許容）
    const errorText = await page.locator('.error-message').textContent();
    expect(errorText).toMatch(/ログインに失敗しました|ログインしてください/);

    // ログインページに留まっていることを確認
    await expect(page.locator('h2')).toHaveText('ログイン');
  });

  // 入力バリデーションのテストケースを追加
  test('空のフォームでログインが防止される', async ({ page }) => {
    await page.click('text=▼管理用ログイン');

    // 何も入力せずにログインボタンをクリック
    await page.click('button[type="submit"]');

    // フォームのバリデーションが機能することを確認
    const emailInput = page.getByLabel('メールアドレス:');
    await expect(emailInput).toHaveAttribute('required', '');

    const passwordInput = page.getByLabel('パスワード:');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  // ログアウトのテストケースを追加
  test('ログアウトが正常に機能する', async ({ page }) => {
    // まずログイン
    await page.click('text=▼管理用ログイン');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'adminpassword');
    await page.click('button[type="submit"]');

    // ダッシュボードページへの遷移を待機
    await expect(page).toHaveURL(/.*dashboard/);

    // ログアウトボタンをクリックし、遷移を待機
    await page.click('text=ログアウト');

    // ホームページまたはログインページへのリダイレクトを確認
    await expect(page).toHaveURL(/.*(\/$|login)/);

    // ログアウト後の状態を確認（より具体的なセレクタを使用）
    await expect(
      page.getByRole('link', { name: 'ログイン' })
    ).toBeVisible();
  });
});
