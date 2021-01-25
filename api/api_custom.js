/*
**  This module contains all the APIs that are custom to each user. i.e. feed,
**  account settings, etc.
**
**  Documentation can be found in :/docs/api_custom.md
*/

const express = require("express");
const bodyParser = require("body-parser");
const { retrieveDocument } = require("../server/read_data");

const router = express.Router();

router.post("/feed", (req, res) => {

  console.log("Feed");
  console.log(req.body);

  const username = req.body.username;

  retrieveDocument("feeds", { username }, doc => {

    console.log(doc);

    res.send(doc);

  });

});

module.exports = router;
