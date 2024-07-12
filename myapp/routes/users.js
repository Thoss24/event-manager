const express = require("express");
const router = express.Router();
const { connection } = require('../db');
const bcrypt = require("bcrypt");

const checkUserExists = (req, res, next) => {
  const { email } = req.body;
  connection.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    if (results.length > 0) {
      res.json("An account with that email already exists.");
    } else {
      next();
    }
  });
};

const addUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  connection.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, hashedPassword],
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
  console.log("TEST")
  const { email, password } = req.body;

  connection.query(
    "SELECT password, user_id, first_name, last_name FROM users WHERE email = ?",
    [email],
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
            id: userId,
            username: email,
            firstName: firstName,
            lastName: lastName
          };
          // Store the session token in the session data
          req.session.user = user;

          console.log("Session token" + req.session.user);

          // Save the session to the sessions table
          req.session.save((error) => {
            if (error) {
              // Handle the error
              console.error('Error saving session:', error);
            } else {
              // Redirect or send response indicating successful login
              res.json(`Login successful | Session ID: ${req.session.sessionToken}`);
            }
          });
        } else {
          return res.json("Email or Password credentials are incorrect")
        }
      })
    }
  );
};

router.post("/register", checkUserExists, addUser);
router.post("/login", login);

module.exports = router;
