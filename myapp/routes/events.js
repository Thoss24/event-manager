const express = require("express");
const router = express.Router();
const { connection } = require("../db");
const { getAllEventMembers, notifyAllMembers } = require('./utils');

function getEvents(req, res, next) {
  connection.query("SELECT * FROM events", (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    res.json(results);
  });
}

function getUserEvents(req, res, next) {
  const {userId} = req.body;

  connection.query(
    `SELECT DISTINCT e.*
    FROM events e
    LEFT JOIN events_users eu ON e.event_id = eu.event_id
    WHERE e.creator_user_id = ? OR eu.user_id = ?`, [userId, userId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching events" });
    }
    res.json(results);
  });
}

function getMyEvents(req, res, next) {
  const userId = req.sessionStore.user.user_id;

  console.log("RESULTS BACKEND TEST")

  connection.query(
    `SELECT DISTINCT e.*
    FROM events e
    LEFT JOIN events_users eu ON e.event_id = eu.event_id
    WHERE e.creator_user_id = ? OR eu.user_id = ?`, [userId, userId], (err, results) => {
    if (err) {
      console.log("Issue fetching events");
      return res.status(500).json({ error: "Error fetching events" });
    }
    console.log("RESULTS BACKEND", results)
    res.json(results);
  });
}

const deleteEvent = async (req, res, next) => {
  const { id } = req.body;

  try {
    // Fetch all event members first
    const allEventMembers = await getAllEventMembers(id);

    // Perform DELETE 
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM events WHERE event_id = ?",
        [id],
        (error, results) => {
          if (error) {
            console.log(error);
            return reject("Internal server error - could not delete event");
          }
          resolve(results);
        }
      );
    });

    if (results.affectedRows === 0) {
      return res.status(404).send("Event not found");
    }

      // Notify all event members
      if (allEventMembers.length > 0) {
      await notifyAllMembers(allEventMembers, id, 'delete');
    } else {
      console.log("This event has no members.")
    }

    res.status(200).send("Event successfully deleted and notifications sent.");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send(error);
  }
};

function removeBookedEvent(req, res, next) {
  const {eventId, userId} = req.body;

  connection.query("DELETE FROM booked_events WHERE event_id = ? AND user_id = ?", [eventId, userId], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Unable to remove event from booked events list")
    } else {
      res.status(200).send("Event successfully removed from booked events list");
    }
  })
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
  const { eventId, userId } = req.body;

  connection.query(
    "INSERT INTO booked_events (user_id, event_id) " +
    "SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM booked_events WHERE event_id = ?)",
    [userId, eventId, eventId],
    (err, results) => {
      if (err) {
        return res.status(500).send("Internal server error");
      }
      if (results.affectedRows === 1) {
        res.json("Event booked successfully");
      } else {
        res.json("You have already booked this event")
      }
    }
  );
};

const getBookedEvents = (req, res, next) => {

  const currUserId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).user.user_id;
  
  connection.query(
    "SELECT be.event_id, e.* FROM booked_events be LEFT JOIN events e ON be.event_id = e.event_id WHERE be.user_id = ?", [currUserId],
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
        "SELECT e.creator_user_id, e.event_id, e.event_name, e.created_at, e.event_img, e.event_description, e.event_date, e.event_time, e.event_type, u.user_id, u.first_name, u.last_name, u.profile_image, u.profile_color FROM events e LEFT JOIN events_users eu ON e.event_id = eu.event_id LEFT JOIN users u ON u.user_id = eu.user_id WHERE e.event_id = ?",
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

    let eventHasNoMembers = results.length === 1 && results[0].user_id === null; // true if no members

    const event = results[0]; 
    const eventDetails = {
      eventCreatorId: event.creator_user_id,
      eventId: event.event_id,
      eventName: event.event_name,
      createdAt: event.created_at,
      eventDate: event.event_date,
      eventDescription: event.event_description,
      eventImg: event.event_img,
      eventTime: event.event_time,
      eventType: event.event_type,
      users: !eventHasNoMembers ? results.map(user => ({
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        profileImage: user.profile_image,
        profileColor: user.profile_color
      })) : [],
    };

    res.json(eventDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const addEvent = async (req, res, next) => {
  const { name, description, date, imageName, time, members } = req.body;

  let insertedId;
  const userId = req.sessionStore.user.user_id;

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO events (event_name, event_description, event_date, event_img, event_time, creator_user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, date, imageName, time, userId],
        (error, results) => {
          if (error) {
            console.log(error);
            return reject(new Error("Internal server error"));
          }

          insertedId = results.insertId;
  
          const eventMembersPromises = members.map((memberId) => {
            return new Promise((resolve, reject) => {
              connection.query(
                "INSERT INTO events_users (user_id, event_id) VALUES (?, ?)",
                [memberId, insertedId],
                (err, result) => {
                  if (err) return reject(err);
                  resolve(result); // Resolve the promise for each insertion
                }
              );
            });
          });

          // Wait for all member insertions to complete
          Promise.all(eventMembersPromises)
            .then(() => resolve(results)) // Resolve the main promise after all are done
            .catch(reject); // Handle any insertion errors
        }
      );
    });

    if (results.affectedRows !== 0) {
      await notifyAllMembers(members, insertedId, 'add'); // Call to notify members
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const checkAuthenticated = async (req, res, next) => {
  const sessionId = Object.keys(req.sessionStore.sessions)[0];

  console.log("SESSION IDDDD: ", sessionId)

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
router.get("/my-events", checkAuthenticated, getMyEvents);
router.get("/booked-events", checkAuthenticated, getBookedEvents);
router.post("/", addEvent);
router.post("/delete-event", deleteEvent);
router.post("/book-event", bookEvent);
router.post("/booked-event-details", getBookedEventDetails);
router.post("/edit-event", editEvent);
router.post("/event-details", checkAuthenticated, getEventDetails);
router.post("/remove-booked-event", checkAuthenticated, removeBookedEvent)
router.post("/get-user-events", getUserEvents)

module.exports = router;
