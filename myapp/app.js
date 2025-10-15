require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const { connection } = require('./db');

const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

const app = express();

const sessionStore = new MySQLStore({}, connection); 

app.use(session({
  secret: process.env.SESSION_SECRET || 'cat',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 30, // 30 minutes
    httpOnly: true,
    sameSite: 'lax',
  },
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const isProd = process.env.NODE_ENV === 'production';
app.use(cors({
  origin: isProd ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV,
  credentials: true,
}));

app.use('/users', usersRouter);
app.use('/events', eventsRouter);

app.use(express.static('public'));

app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
