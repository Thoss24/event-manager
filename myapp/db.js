require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE
});

// db

connection.connect((err) => {
    if (err) {
        // console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log(`Connected to MySQL database: ${process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE}`);
});

// console.log('DB_USERNAME:', process.env.DB_USERNAME);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DATABASE:', process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE);

module.exports = { connection };