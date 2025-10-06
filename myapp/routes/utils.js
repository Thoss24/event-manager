const { connection } = require("../db");

const getAllEventMembers = async (eventId) => { 

  if (!eventId) {
    throw new Error('Event details not provided. Cannot find event members.');
  };

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

const notifyAllMembers = async (members, eventId, actionType) => {

  if (members.length === 0) {
    throw new Error('No members available to notify.');
  };

  if (actionType.length === 0) {
    throw new Error('Event action not defined.');
  };

  if (!eventId) {
    throw new Error('Event details not provided. Cannot notify associated members.');
  };

  let notification;

  const notificationPromises = members.map(member => {

    const userId = member.user_id ? member.user_id : member;

    switch(actionType) {
      case 'delete':
        notification = `Event with ID: ${eventId} has been deleted by the event creator.`
        break;
      case 'add':
        notification = `User with ID: ${userId} has been added to event with event ID: ${eventId}`
        break;
    }
    
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

const checkAccountType = (req, res, next) => {

  const userId = req.body.userId ? req.body.userId : req.sessionStore.user.user_id; // assigned at login
  
  connection.query('SELECT * FROM users WHERE user_id = (?)', [userId], (err, results) => {
    if (err) {
      return res.status(500).send("Could not find user");
    }
    res.json(results)
  })

}

// export functions
module.exports = {
  getAllEventMembers,
  notifyAllMembers,
  checkAccountType,
};