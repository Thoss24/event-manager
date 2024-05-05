const express = require("express");
const app = express.Router();

const usersRouter = require('./users')
const eventsRouter = require('./events')

const isAuthenticated = (req, res, next) => {
    console.log("Session " + session)
    console.log("Req.session " + req.session)
    if (req.session.sessionToken) {
      // Session token exists, indicating an authenticated session
      console.log("Authorized session " + req.session)
      res.json(`Authorized | User Id: ${req.session.sessionToken}`)
      next();
    } else {
      // Session token does not exist, redirect or send unauthorized response
      console.log(`Unauthorized check : ${req.session.sessionToken}`)
      res.status(401).send('Unauthorized');
    }
};

app.use("/users/", isAuthenticated, usersRouter);
app.use("/events/", eventsRouter);

module.exports = app;
