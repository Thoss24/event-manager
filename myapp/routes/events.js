const express = require("express");
const router = express.Router();
const { connection } = require("../db");

function getEvents(req, res, next) {
  connection.query("SELECT * FROM events", (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    res.json(results);
  });
}

const editEvent = (req, res, next) => {
  const { name, description, date, eventId } = req.body;

  connection.query(
    "UPDATE events SET event_name = ?, event_description = ?, event_date = ? WHERE event_id = ?",
    [name, description, date, eventId],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    }
  );
};

const bookEvent = (req, res, next) => {
  const { id } = req.body;

  connection.query(
    "UPDATE events SET booked = 1 WHERE event_id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).send("Internal server error");
      }
      res.json("Event booked successfully");
    }
  );
};

const getBookedEvents = (req, res, next) => {
  connection.query(
    "SELECT * FROM events WHERE booked = 1",
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    }
  );
};

const getBookedEventDetails = (req, res, next) => {
  const { id } = req.body;
  connection.query(
    "SELECT * FROM events WHERE event_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    }
  );
};

const getEventDetails = (req, res, next) => {
  const { id } = req.body;
  console.log("Event ID: ", id);
  connection.query(
    "SELECT * FROM events WHERE event_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      console.log(results);
      res.json(results);
    }
  );
};

const addEvent = (req, res, next) => {
  const { name, description, date, imageName, time, members } = req.body;
  console.log("Members: ", members);
  connection.query(
    "INSERT INTO events (event_name, event_description, event_date, event_img, event_time) VALUES (?, ?, ?, ?, ?)",
    [name, description, date, imageName, time],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }

      connection.query(
        "SELECT LAST_INSERT_ID() AS inserted_id",
        (err, result) => {
          if (err) throw err;

          const insertedId = result[0].inserted_id;

          members.forEach((element) => {
            connection.query(
              "INSERT INTO events_users (user_id, event_id) VALUES (?, ?)",
              [element, insertedId],
              (err, result) => {
                if (err) throw err;
              }
            );
          });
        }
      );

      res.json(results);
    }
  );
};

const checkAuthenticated = async (req, res, next) => {
  const sessionId = Object.keys(req.sessionStore.sessions)[0];

  connection.query(
    "SELECT * FROM sessions WHERE session_id = ?",
    [sessionId],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      if (results.length > 0) {
        next();
      } else {
        res.sendStatus(401);
      }
    }
  );
};

router.get("/", checkAuthenticated, getEvents);
router.get("/booked-events", checkAuthenticated, getBookedEvents);
router.post("/", addEvent);
router.post("/book-event", bookEvent);
router.post("/booked-event-details", getBookedEventDetails);
router.post("/edit-event", editEvent);
router.post("/event-details", checkAuthenticated, getEventDetails);

module.exports = router;
