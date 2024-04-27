const express = require("express");
const app = express.Router();

const usersRouter = require('./users')
const eventsRouter = require('./events')

app.use("/users/", usersRouter);
app.use("/events/", eventsRouter);

module.exports = app;
