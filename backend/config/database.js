// githubアクション3
const { Sequelize } = require('sequelize');
const config = require('./config.js');
require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH });

// console.log(`Connecting to database: ${dbConfig.database}`);
const env = process.env.NODE_ENV || 'development';
let dbConfig = config[env];


// 環境変数で設定を上書き
Object.keys(dbConfig).forEach(key => {
  const envKey = `DB_${key.toUpperCase()}`;
  if (process.env[envKey]) {
    dbConfig[key] = process.env[envKey];
  }
});


console.log('Environment:', env);
console.log('Current config:', JSON.stringify(dbConfig, null, 2));

if (!dbConfig.username || !dbConfig.password || !dbConfig.database || !dbConfig.host) {
  throw new Error('Database configuration is incomplete. Please check your config.js and environment variables.');
}

console.log(`Connecting to database: ${dbConfig.database}`);

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  dialectOptions: {
    connectTimeout: 60000
  }
});
// logging: console.log // デバッグ用。本番環境では false に設定することをお勧めします


// データベース接続テスト
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
