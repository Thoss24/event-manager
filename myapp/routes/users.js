const express = require("express");
const router = express.Router();
const { connection } = require("../db");
const bcrypt = require("bcrypt");
const { checkAccountType } = require('./utils');

const checkUserExists = (req, res, next) => {
  const { email } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      if (results.length > 0) {
        res.json("An account with that email already exists.");
      } else {
        next();
      }
    }
  );
};

const addUser = (req, res, next) => {
  const { firstName, lastName, email, password, profileImage, profileImgColor } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  connection.query(
    "INSERT INTO users (first_name, last_name, email, password, profile_image, profile_color) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, hashedPassword, profileImage, profileImgColor],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    }
  );
};

const login = (req, res, next) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT password, user_id, first_name, last_name FROM users WHERE email = ?",
    [username],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      if (results.length === 0) {
        res.json("An account with that email doesn't exist.");
        return;
      }

      const hashedPassword = results[0].password;
      const userId = results[0].user_id;
      const firstName = results[0].first_name;
      const lastName = results[0].last_name;

      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Internal server error");
        }
        if (result) {
          const user = {
            user_id: userId,
            email: username,
            firstName: firstName,
            lastName: lastName
          };
          
          req.session.authenticated = true;
          req.session.user = user;

          req.sessionStore.user = user;

          connection.query(
            "INSERT INTO sessions (session_id, expires) VALUES (?, ?)",
            [req.sessionID, req.session.cookie.expires],
            (error, results) => {
              console.log(results)
              if (error) {
                console.log(error);
                return res.status(500).send("Internal server error");
              }
              res.json("Login successful");
            }
          );
        } else {
          return res.json("Email and or Password are incorrect")
        }
      })
    }
  );
};

const getAllUsers = (req, res, next) => {

  const userId = req.sessionStore.user.user_id;

  connection.query('SELECT * FROM users WHERE user_id != ?', [userId], (err, results) => {
    if (err) {
      console.log("Issue fetching users")
      return res.status(500).json({ error: "Error fetching users" });
    }
    res.json(results)
  })
}

const createResponse = (req, res, next) => {
  const {response, eventId} = req.body;

  const userId = req.sessionStore.user.user_id;

  connection.query('INSERT INTO responses (response, event_id, user_id) VALUES (?, ?, ?)', [response, eventId, userId], (err, results) => {
    if (err) {
      console.log(err)
      console.log("Could not add response")
    }
    res.json("Response successfully added!")
  })

}

const getResponses = (req, res, next) => {

  const eventId = req.body;

  connection.query('SELECT * FROM responses WHERE event_id = (?)', [eventId], (err, results) => {
    if (err) {
      console.log(err, "Could not add response")
    }
    console.log(results)
    res.json(results)
  })
}

const getNotifications = (req, res, next) => {
  const { userId } = req.body;
  console.log("Notification userid", userId)

  connection.query('SELECT * FROM notifications WHERE user_id = ? AND seen = 0', [userId], (err, results) => {
    console.log("Notification results", results)
    if (err) {
      // Send a 500 status code for server errors
      return res.status(500).json({ error: 'Database query error', details: err });
    }

    // Check if results are empty
    if (results.length === 0) {
      return res.json({ message: 'No notifications found.' });
    }

    // Send the results as a response
    res.status(200).json(results);
  });
};

const getNotificationById = (req, res, next) => {
  const {notificationId} = req.body;

  console.log("NOTIFICATION ID", notificationId)

  connection.query('SELECT * FROM notifications WHERE id = ?', [notificationId], (err, results) => {
    if (err) {
      res.json(err)
    }
    res.json(results)
  })
}

const clearNotification = (req, res, next) => {
  const {notificationId} = req.body;
  const seen = 1;

  connection.query('UPDATE notifications SET seen = ? WHERE id = ?', [seen, notificationId], (err, results) => {
    if (err) {
      res.json(err)
    }
    res.json(results)
  })
}

const getUserInfo = (req, res, next) => {
  let userId = req.body.userId; // expecting userId to be a string

  if (!userId) {
    return res.status(400).json({ error: 'Invalid or missing userId.' });
  }

  if (userId === 'current') {
    userId = req.sessionStore.user.user_id;
  }

  connection.query(
    'SELECT user_id, email, first_name, last_name, profile_image, profile_color FROM users WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database query failed.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json(results[0]);
    }
  );
};

router.get("/get-all-users", getAllUsers);
router.post("/get-user-info", getUserInfo);
router.post("/get-account-type", checkAccountType);
router.post("/register", checkUserExists, addUser);
router.post("/login", login);
router.post("/create-response", createResponse);
router.post("/get-responses", getResponses);
router.post("/get-notifications", getNotifications);
router.post("/get-notification-by-id", getNotificationById);
router.post("/clear-notification", clearNotification);

module.exports = router;
