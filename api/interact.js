const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("../key");

const router = express.Router();

router.post("/comment", (req, res) => {

  const comment = {
    poster: req.body.poster,
    comment: req.body.comment,
    date: ""
  };

  // TODO: create general function
  const collection = database.collection("comments");

  collection.findOneAndUpdate(
    { ref: 2 },
    { $push: { comments: comment } }
  );

  res.header("Access-Control-Allow-Origin", "*");
  res.send({ success: true });

});

module.exports = router;
