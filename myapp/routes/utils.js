const express = require("express");
const router = express.Router();
const { connection } = require("../db");

const getAllEventMembers = (eventId) => { 

  // get all event members based on event_id
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM events_users WHERE event_id = ?', [eventId], (error, results) => {
      if (error) {
        return reject("Internal server error - could not get event members");
      }
      resolve(results);
    })
  })

}

const createNotifications = (userId, eventId) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO notifications (user_id, event_id) VALUES (?, ?)', [userId, eventId], (error, results) => {
      if (error) {
        return reject("Internal server error - could not get event members");
      }
      resolve(results);
    })
  })
}

// export functions
module.exports = {
  getAllEventMembers,
  createNotifications
};