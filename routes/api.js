/*
//  API that returns JSON data used for display in the app and website
*/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("../key");

const router = express.Router();

/* Sends information for photo of specified reference number */
router.get("/photo/:ref", (req, res) => {

  req.params.ref = parseInt(req.params.ref);

  let collection = database.collection("photos");

  collection.findOne({ "ref": req.params.ref }).then(entry => {
    res.send(entry);
  });

});

/* Sends dummy user information */
router.get("/user/:username", (req, res) => {

  let collection = database.collection("users");

  collection.findOne({ "username": req.params.username }).then(entry => {
    res.send(entry);
  });

});

/* Sends dummy leaderboard information as an array with elements of the following format */
/*
    username: string
    position: number
    rank: number
    points: number
    country: string
*/
router.get("/leaderboard/global", (req, res) => {

  let leaderboardNames = [
    "Eva", "Hans", "Maria", "Leah", "Felipe",
    "Yusuf", "Luis", "Claire", "Mia", "Siddhartha",
    "Lucas", "Mikaila", "Roseanna", "Jean", "Lee"
  ];

  let leaderboard = new Array();

  leaderboardNames.forEach((username, position) => {
    let user = getUser(username);
    let entry = {
      username: username,
      position: position,
      rank: 100,
      points: 2325 + Math.pow(5-position, 3),
      country: user.country
    }
    leaderboard.push(entry);
  });

  res.send(leaderboard);

});

/* Sends dummy feed for specified user. Each element is a photo. */
router.get("/feed/:username", (req, res) => {
  let posts = [
    {
      poster: "Felipe",
      ref: 1,
      hearts: 137,
      comments: 19,
      location: "Mongolia",
      caption: "A cute marmot"
    },
    {
      poster: "Hannah",
      ref: 2,
      hearts: 121,
      comments: 6,
      location: "Shetland, United Kingdom",
      caption: "This is a puffin that I found"
    },
    {
      poster: "Michael",
      ref: 3,
      hearts: 73,
      comments: 4,
      location: "Australia",
      caption: "Koala bear"
    }
  ];

  res.send(posts);

});

module.exports = router;
