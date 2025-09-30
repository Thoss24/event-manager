require('dotenv').config();
const mysql = require('mysql2');

const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';

const connection = mysql.createConnection({
  host: isProd ? process.env.DB_HOST_PROD : process.env.DB_HOST,
  user: isProd ? process.env.DB_USERNAME_PROD : process.env.DB_USERNAME,
  password: isProd ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD,
  database: isTest 
    ? process.env.DB_TEST_DATABASE 
    : isProd 
      ? process.env.DB_DATABASE_PROD 
      : process.env.DB_DATABASE,
});

// Connect to DB
connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log(`✅ Connected to MySQL database: ${
    isTest 
      ? process.env.DB_TEST_DATABASE 
      : isProd 
        ? process.env.DB_DATABASE_PROD 
        : process.env.DB_DATABASE
  }`);
});

module.exports = { connection };
