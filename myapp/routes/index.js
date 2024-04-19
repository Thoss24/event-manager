const express = require('express');
const router = express.Router();
const db = require('../db');

function getEvents(req, res, next){

  db.query("SELECT * FROM events", (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).send("Internal server error");
    }

    res.json(results)
  })
};

router.get("/", getEvents);

module.exports = router;
