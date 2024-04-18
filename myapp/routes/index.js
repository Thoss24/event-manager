var express = require('express');
var router = express.Router();

function firstMiddleware(req, res, next){
  console.log("hy");
  next()
}

function secondMiddleware(req,res,next) {
  console.log("hello")
  res.json("hello");
}

router.get("/", firstMiddleware, secondMiddleware);

module.exports = router;
