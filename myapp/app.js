require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
const WebSocket = require('ws');
const { connection } = require("./db");
// const passport = require('passport')
// const local = require('./strategies/local')

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

const store = new session.MemoryStore();
const app = express();
const port = 4000;

app.use(session({
  secret: 'cat',
  cookie: { maxAge: 30000 },
  resave: false,
  saveUninitialized: false,
  store
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// app.use(passport.initialize())
// app.use(passport.session())

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// WebSocket server
const wss = new WebSocket.Server({ port: 4000 });

// Store connected clients
const clients = new Set();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected.');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Example: Store a new notification in the database
    const notification = JSON.parse(message);
    const sql = 'INSERT INTO notifications (message) VALUES (?)';
    connection.query(sql, [notification.message], (err) => {
      if (err) throw err;
      console.log('Notification saved to database.');

      // Broadcast the notification to all clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(notification));
        }
      });
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
    clients.delete(ws);
  });
});

// Integrate WebSocket with Express
// app.server = app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

console.log(`Server running on http://localhost:${port}`);

// app.server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

module.exports = app;
