const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("../key");

const router = express.Router();

router.get("/:ref", (req, res) => {

  req.params.ref = parseInt(req.params.ref);

  let collection = database.collection("photos");

  collection.findOne({ "ref": req.params.ref }).then(entry => {
    res.send(entry);
  });

});

module.exports = router;
