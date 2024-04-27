const express = require("express");
const router = express.Router();
const db = require("../db");

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

  console.log("test")

  db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    }
  );
};

router.use("/register", checkUserExists, addUser);

module.exports = router;
