const express = require("express");
const router = express.Router();
const { connection } = require("../db");

const getAllEventMembers = async (eventId) => { 

  // get all event members based on event_id
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM events_users WHERE event_id = ?', [eventId], (error, results) => {
      if (error) {
        return reject("Internal server error - could not get event members");
      }
      resolve(results);
    })
  })

};

const notifyAllMembers = async (membersAmount, eventId) => {
  const notificationPromises = membersAmount.map(member => {

    const userId = member.user_id;
    const notification = `Event with ID: ${eventId} has been deleted by the event creator.`;
    
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO notifications (user_id, event_id, notification, seen) VALUES (?, ?, ?, ?)",
        [userId, eventId, notification, 0],
        (error) => {
          if (error) {
            console.log(error)
            return reject(`Internal server error - unable to send notification to user id: ${userId}`);
          }
          resolve(`User id: ${userId} was notified of event deletion.`);
        }
      );
    });

  });

  await Promise.all(notificationPromises); // Wait for all notifications to complete
}

// export functions
module.exports = {
  getAllEventMembers,
  notifyAllMembers
};