const express = require('express');
const usersRouter = require('../myapp/routes/users'); // users router

const testingApp = express();
testingApp.use(express.json()); // Middleware to parse JSON requests
testingApp.use('/api', usersRouter); // Use your router

module.exports = testingApp;