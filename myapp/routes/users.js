const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

const checkUserExists = (req, res, next) => {
  const { email } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
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

  db.query(
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
  const { email, password } = req.body;

  db.query(
    "SELECT password, user_id, first_name, last_name FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      if (results.length === 0) {
        res.json("An account with that email doesn't exist.");
      }

      const hashedPassword = results[0].password
      const userId = results[0].user_id
      const firstName = results[0].first_name
      const lastName = results[0].last_name

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
          req.session.user = user;
          res.redirect('/');
          return res.json("Login successful")
        } else {
          return res.json("Email or Password credentials are incorrect")
        }
      })
    }
  );
};

const requireAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

// Apply the authentication middleware to the protected routes
const applyAuth = (req, res, next) => {
  res.json({ message: 'Protected route accessed successfully' });
}

router.post("/register", checkUserExists, addUser);
router.post("/login", login);
router.get('/', requireAuth, applyAuth) // setup group of routes that require auth

module.exports = router;
