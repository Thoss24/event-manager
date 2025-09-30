require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
const { connection } = require("./db");

var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

const store = new session.MemoryStore();
const app = express();

// Sessions
app.use(session({
  secret: 'cat', // in production, move this to process.env.SESSION_SECRET
  cookie: { maxAge: 30000 },
  resave: false,
  saveUninitialized: false,
  store
}));

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic CORS config
const isProd = process.env.NODE_ENV === "production";
app.use(cors({
  origin: isProd ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV,
  credentials: true,
}));

// Routes
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

app.use(express.static('public'));

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
