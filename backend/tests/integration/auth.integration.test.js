const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');

describe('認証APIの結合テスト', () => {
  const testUsers = [
    {
      username: 'test_admin',
      email: 'testadmin@example.com',
      password: 'TestAdmin123!',
      role: 'admin'
    },
    {
      username: 'test_free',
      email: 'testfree@example.com',
      password: 'TestFree123!',
      role: 'free'
    }
  ];

  // テスト前にユーザーを作成
  beforeAll(async () => {
    for (const user of testUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword
      });
    }
  });

  // テスト後にユーザーを削除
  afterAll(async () => {
    await User.destroy({
      where: {
        email: testUsers.map(user => user.email)
      }
    });
  });

  // 1. 管理者ログインのテスト
  test('管理者として正常にログインできる', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: testUsers[0].email,
        password: testUsers[0].password
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.role).toBe('admin');
    expect(response.body.username).toBe(testUsers[0].username);
  });

  // 2. 一般ユーザーログインのテスト
  test('一般ユーザーとして正常にログインできる', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: testUsers[1].email,
        password: testUsers[1].password
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.role).toBe('free');
  });

  // 3. 不正なログイン試行のテスト
  test('不正なパスワードでログインが失敗する', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: testUsers[0].email,
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('メールアドレスまたはパスワードが無効です');
  });

  // 4. プロフィール取得のテスト
  test('認証済みユーザーがプロフィールを取得できる', async () => {
    // まずログインしてトークンを取得
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: testUsers[0].email,
        password: testUsers[0].password
      });

    const token = loginResponse.body.token;

    // トークンを使用してプロフィールを取得
    const profileResponse = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.email).toBe(testUsers[0].email);
    expect(profileResponse.body.username).toBe(testUsers[0].username);
  });
});
