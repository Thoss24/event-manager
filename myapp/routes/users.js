const express = require("express");
const router = express.Router();
const passport = require('passport')
const { connection } = require("../db");
const bcrypt = require("bcrypt");

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

          console.log("Login - SESSION ID: ", req.session.cookie.expires)

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

router.post("/register", checkUserExists, addUser);
router.post("/login", login);

module.exports = router;
