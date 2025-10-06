require('dotenv').config();
const mysql = require('mysql2');

const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';

// Use connection pool instead of single connection
const pool = mysql.createPool({
  host: isProd ? process.env.DB_HOST_PROD : process.env.DB_HOST,
  user: isProd ? process.env.DB_USERNAME_PROD : process.env.DB_USERNAME,
  password: isProd ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD,
  database: isTest 
    ? process.env.DB_TEST_DATABASE 
    : isProd 
      ? process.env.DB_DATABASE_PROD 
      : process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test the connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    console.error('⚠️  Server will continue, but database operations may fail until MySQL is available');
    return;
  }
  
  console.log(`✅ Connected to MySQL database  ---- :): ${
    isTest 
      ? process.env.DB_TEST_DATABASE 
      : isProd 
        ? process.env.DB_DATABASE_PROD 
        : process.env.DB_DATABASE
  }`);
  
  connection.release(); // Return connection to pool
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ MySQL Pool Error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('🔄 Database connection lost. Pool will reconnect automatically.');
  }
});

module.exports = { connection: pool };