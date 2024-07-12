const express = require("express");
const router = express.Router();
const { connection } = require('../db');

function getEvents(req, res, next) {
  connection.query("SELECT * FROM events", (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    res.json(results);
  });
}

const getBookedEvents = (req, res, next) => {
  connection.query("SELECT * FROM events WHERE booked = 1", (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    res.json(results)
  })
};

const getBookedEventDetails = (req, res, next) => {
  const {id} = req.body;
  console.log(id)
  connection.query("SELECT * FROM events WHERE event_id = ?", [id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    res.json(results)
  })
}

const addEvent = (req, res, next) => {
  const { name, description, date, imageName, time } = req.body;
  connection.query(
    "INSERT INTO events (event_name, event_description, event_date, event_img, event_time) VALUES (?, ?, ?, ?, ?)",
    [name, description, date, imageName, time], 
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results)
    }
  );
};

const isAuthenticated = (req, res, next) => {
  console.log("Is authenticated - Session " + req.session.user)
  // if (req.session.sessionToken) {
  //   // Session token exists, indicating an authenticated session
  //   console.log("Authorized session " + req.session)
  //   res.json(`Authorized | User Id: ${req.session.sessionToken}`)
  //   next();
  // } else {
  //   // Session token does not exist, redirect or send unauthorized response
  //   console.log(`Unauthorized check : ${req.session.sessionToken}`)
  //   res.status(401).send('Unauthorized');
  // }
};

router.get("/", isAuthenticated, getEvents);
router.get("/booked-events", getBookedEvents)
router.post("/", addEvent);
router.post("/booked-event-details", getBookedEventDetails)

module.exports = router;
