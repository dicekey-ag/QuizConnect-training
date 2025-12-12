const { User, Sequelize } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// メールアドレスの正規表現を更新
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// パスワードの正規表現（ラテン文字、数字、特定の特殊文字のみを許可）
const passwordRegex = /^[a-zA-Z0-9@#$%&*+=!-]+$/;

// ユーザー登録
exports.register = async (req, res) => {
  let { username, email, password, role } = req.body;
  console.log('Registration attempt:', { username, email, role }); // デバッグログ

  // 入力バリデーション
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'ユーザー名、メールアドレス、パスワードは必須です' });
  }

  // メールアドレスの空白除去と小文字変換
  email = email.trim().toLowerCase();

  // メールアドレス形式チェック
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '無効なメールアドレス形式です' });
  }

  // パスワードの文字種チェック
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'パスワードには英数字と特定の特殊文字のみ使用できます' });
  }

  // パスワード長さチェック
  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({ message: 'パスワードは8文字以上20文字以下である必要があります' });
  }

  // ユーザー名の長さチェック
  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({ message: 'ユーザー名は3文字以上20文字以下である必要があります' });
  }

  // ロールのバリデーション（オプション）
  const validRoles = ['free', 'paid', 'admin'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: '無効なロールです' });
  }

  try {
    // メールアドレスの重複チェック
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Email already exists:', email); // デバッグログ
      return res.status(400).json({ message: 'このメールアドレスは既に使用されています' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });
    res.status(201).json({ message: 'ユーザー登録が完了しました' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// ログイン
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password); // ログを追加
  console.log('Request body:', req.body); // リクエストボディをログ出力

  // 入力バリデーション
  if (!email || !password) {
    return res.status(400).json({ message: 'メールアドレスとパスワードは必須です' });
  }

  // メールアドレスの空白チェック
  if (email.trim() !== email) {
    return res.status(400).json({ message: 'メールアドレスに空白を含めることはできません' });
  }

  // パスワードの空白チェック
  if (password.trim() !== password) {
    return res.status(400).json({ message: 'パスワードに空白を含めることはできません' });
  }

  // メールアドレス形式チェック
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '無効なメールアドレス形式です' });
  }

  // パスワードの文字種チェック
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'パスワードには英数字と特定の特殊文字のみ使用できます' });
  }

  // パスワード長さチェック
  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({ message: 'パスワードは8文字以上20文字以下である必要があります' });
  }


  try {
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        password: {
          [Sequelize.Op.ne]: null  // パスワードがnullでないユーザーのみ検索
        }
      }
    });

    if (!user) {
      // Google認証ユーザーの場合はGoogleログインを案内
      const googleUser = await User.findOne({
        where: {
          email: email.toLowerCase(),
          googleId: {
            [Sequelize.Op.ne]: null
          }
        }
      });

      if (googleUser) {
        return res.status(401).json({
          message: 'このアカウントはGoogleログインを使用してください',
          useGoogle: true
        });
      }

      return res.status(401).json({ message: 'メールアドレスまたはパスワードが無効です' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password'); // ログを追加
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが無効です' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    // デバッグログを追加
    console.log('User found:', {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    });

    console.log('Sending response:', {
      token: token.substring(0, 20) + '...',
      role: user.role,
      username: user.username
    });
    console.log('Login successful:', user.email, user.role); // ログを追加
    res.status(200).json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error('Login successful', error);
    console.error('Login error:', error);
    if (error instanceof SyntaxError) {
      res.status(400).json({ message: 'リクエストボディが不正なJSONフォーマットです' });
    } else {
      res.status(500).json({ message: 'サーバーエラー' });
    }
  }
};

// ユーザー情報の取得
exports.getUserProfile = async (req, res) => {
  console.log('GetUserProfile - Request userId:', req.userId);
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email', 'role']
    });
    if (!user) {
      console.log('User not found for id:', req.userId);
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    console.log('User found:', user.toJSON());
    res.status(200).json(user);
  } catch (error) {
    console.error('GetUserProfile error:', error);
    if (error instanceof SyntaxError) {
      res.status(400).json({ message: 'Invalid JSON format' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// ユーザー情報の取得nの追加(ALL？)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

exports.changeUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  console.log('Changing user role:', { userId, newRole });

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    if (!['free', 'paid', 'admin'].includes(newRole)) {
      console.log('Invalid role:', newRole);
      return res.status(400).json({ message: '無効なロールです' });
    }

    const oldRole = user.role;
    user.role = newRole;
    await user.save();

    res.status(200).json({ message: 'ユーザーロールが更新されました', user });
  } catch (error) {
    console.error('Error changing user role:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

exports.refreshToken = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'トークンのリフレッシュに失敗しました' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    await user.destroy();
    res.status(200).json({ message: 'ユーザーが正常に削除されました' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'ユーザーの削除中にエラーが発生しました' });
  }
};
