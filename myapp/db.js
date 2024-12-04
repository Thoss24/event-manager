require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = {connection};

// require('dotenv').config();
// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

// async function connectToDatabase() {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Connected to MySQL database');
//         // Don't forget to release the connection when done
//         connection.release();
//     } catch (err) {
//         console.error('Error connecting to MySQL database:', err);
//     }
// }

// connectToDatabase();

// module.exports = { pool };