const express = require("express");
const app = express();
const db = require("../db");

function getEvents(req, res, next) {
  db.query("SELECT * FROM events", (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
    res.json(results);
  });
}

const addEvent = (req, res, next) => {
  const { name, description, date, imageName } = req.body;
  db.query(
    "INSERT INTO events (event_name, event_description, event_date, event_img) VALUES (?, ?, ?, ?)",
    [name, description, date, imageName], 
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
      res.json(results)
    }
  );
};

app.get("/", getEvents);
app.post("/", addEvent);

module.exports = app;
