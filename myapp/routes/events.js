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

function deleteEvent(req, res, next) {
  const { id } = req.body;
  connection.query(
    "DELETE FROM events WHERE event_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    }
  );
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

const getEventDetails = async (req, res, next) => {
  const { id } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).send("Invalid event ID");
  }

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT e.event_id, e.event_name, e.created_at, e.event_img, e.event_description, e.event_date, e.booked, e.event_time, e.event_type, u.user_id, u.first_name, u.last_name, u.profile_image, u.profile_color FROM events e LEFT JOIN events_users eu ON e.event_id = eu.event_id LEFT JOIN users u ON u.user_id = eu.user_id WHERE e.event_id = ?",
        [id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });

    if (results.length === 0) {
      return res.status(404).send("Event not found");
    }

    const event = results[0]; 
    const eventDetails = {
      eventId: event.event_id,
      eventName: event.event_name,
      createdAt: event.created_at,
      eventDate: event.event_date,
      eventDescription: event.event_description,
      eventImg: event.event_img,
      eventTime: event.event_time,
      eventType: event.event_type,
      users: results.map(user => ({
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        profileImage: user.profile_image,
        profileColor: user.profile_color
      })),
    };

    res.json(eventDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
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
router.post("/delete-event", deleteEvent);
router.post("/book-event", bookEvent);
router.post("/booked-event-details", getBookedEventDetails);
router.post("/edit-event", editEvent);
router.post("/event-details", checkAuthenticated, getEventDetails);

module.exports = router;
