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
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.log("Issue fetching users")
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

  const {eventId} = req.body;

  connection.query('SELECT * FROM responses WHERE event_id = (?)', [eventId], (err, results) => {
    if (err) {
      console.log(err, "Could not add response")
    }
    console.log(results)
    res.json(results)
  })
}

const getNotifications = (req, res, next) => {
  const {userId} = req.body;

  connection.query('SELECT * FROM notifications WHERE user_id = (?)', [userId], (err, results) => {
    if (err) {
      res.json(err)
    }
    res.json(results)
  })
}

const clearNotification = (req, res, next) => {

}

router.get("/get-all-users", getAllUsers);
router.get("/get-account-type", checkAccountType);
router.post("/register", checkUserExists, addUser);
router.post("/login", login);
router.post("/create-response", createResponse);
router.post("/get-responses", getResponses);
router.post("/get-notifications", getNotifications);
router.post("/clear-notification", clearNotification);

module.exports = router;
