const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

// 定数の定義を拡張
const UPLOAD_DIR = path.join(__dirname, '../uploads');
const IMAGE_UPLOAD_DIR = path.join(UPLOAD_DIR, 'images');
const CSV_UPLOAD_DIR = path.join(UPLOAD_DIR, 'csv');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const ALLOWED_CSV_TYPES = ['text/csv'];

// アップロードディレクトリの初期化を拡張
const initializeUploadDirs = async () => {
  try {
    // fs.promises.mkdirを使用
    await fs.promises.mkdir(IMAGE_UPLOAD_DIR, { recursive: true });
    await fs.promises.mkdir(CSV_UPLOAD_DIR, { recursive: true });
    console.log('Upload directories created successfully');
  } catch (error) {
    console.error('Error creating upload directories:', error);
    throw error;
  }
};

// カスタムエラークラスの拡張
class FileUploadError extends Error {
  constructor(message, code, statusCode = 400) {
    super(message);
    this.name = 'FileUploadError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

// 初期化を実行
initializeUploadDirs().catch(console.error);

// ストレージ設定を拡張
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // ファイルタイプに基づいて保存先を決定
      const uploadDir = file.fieldname === 'file' && file.mimetype === 'text/csv'
        ? CSV_UPLOAD_DIR
        : IMAGE_UPLOAD_DIR;

      cb(null, uploadDir);
    } catch (error) {
      cb(new FileUploadError('Upload directory error', 'UPLOAD_DIR_ERROR', 500));
    }
  },
  filename: (req, file, cb) => {
    const sanitizedName = path.parse(file.originalname).name
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    const ext = path.parse(file.originalname).ext.toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const prefix = file.fieldname === 'file' ? 'csv' : 'question';
    cb(null, `${prefix}-${uniqueSuffix}-${sanitizedName}${ext}`);
  }
});

// ファイルフィルターを拡張
const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(new FileUploadError('No file provided', 'NO_FILE'));
  }

  if (file.fieldname === 'file') {
    if (!ALLOWED_CSV_TYPES.includes(file.mimetype)) {
      return cb(new FileUploadError('Invalid file type. Only CSV files are allowed.', 'INVALID_FILE_TYPE'));
    }
  } else {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      return cb(new FileUploadError(
        `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
        'INVALID_FILE_TYPE'
      ));
    }
  }

  cb(null, true);
};

// Multerの設定を拡張
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1
  }
});

// アップロードミドルウェアを拡張
const createUploadMiddleware = (fieldName) => async (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    return next();
  }

  const uploadHandler = upload.single(fieldName);

  try {
    await new Promise((resolve, reject) => {
      uploadHandler(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    next();
  } catch (error) {
    console.error('Upload error:', error);
    if (req.file) {
      await deleteFile(req.file.path).catch(console.error);
    }

    res.status(error.statusCode || 500).json({
      error: error.message,
      code: error.code
    });
  }
};

// ファイル削除機能の改善
const deleteFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fsPromises.access(filePath);
    await fsPromises.unlink(filePath);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error deleting file ${filePath}:`, error);
      throw new FileUploadError('File deletion failed', 'FILE_DELETE_ERROR', 500);
    }
  }
};

// CSVアップロード用の設定を追加
const csvUploadConfig = {
  limits: {
    fileSize: 10 * 1024 * 1024, // CSVは10MBまで許可
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
      return cb(new FileUploadError('Invalid file type. Only CSV files are allowed.', 'INVALID_FILE_TYPE'));
    }
    cb(null, true);
  }
};

// コールバックベースのmkdirの代わりにPromiseベースのバージョンを使用
module.exports = {
  imageUploadMiddleware: createUploadMiddleware('image'),
  csvUploadMiddleware: createUploadMiddleware('file'),
  deleteFile,
  IMAGE_UPLOAD_DIR,
  CSV_UPLOAD_DIR,
  FileUploadError
};
