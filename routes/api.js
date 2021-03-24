/*
//  API that returns JSON data used for display in the app and website
*/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("../key");
const { retrieveDocument, retrieveManyDocuments } = require("../server/read_data");

const router = express.Router();

/* DUMMY FUNCTION - To be implemented */
/* This will retrieve the user data from the database */
function getUser(username) {
  return {
    username: username,
    country: "United Kingdom",
    area: "Edinburgh",
    joindate: "27 Mar 2021",
    bio: "I mostly do city life stuff but occasionally slip out into the wilderness.",
    rank: 12,
    points: 132,
    followers: 137,
    following: 43
  }
}

/* Sends information for photo of specified reference number */
router.get("/photo/:ref", (req, res) => {

  req.params.ref = parseInt(req.params.ref);

  const collection = database.collection("photos");

  collection.findOne({ "ref": req.params.ref }).then(entry => {
    res.send(entry);
  });

});

/* Sends dummy user information */
router.get("/user/:username", (req, res) => {

  const collection = database.collection("users");

  collection.findOne({ "username": req.params.username }).then(entry => {
    res.send(entry);
  });

});

router.get("/activity/:username", (req, res) => {

    retrieveDocument("activity", { username: req.params.username }, doc => {
        res.send({ activity: doc.activity });
    })

});

/* Sends dummy leaderboard information */
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

/* May generalise this with a :collection paramter to remove repeated APIs */
/* Sends comments on photo of reference number */
router.get("/comments/:ref", (req, res) => {

  req.params.ref = parseInt(req.params.ref);

  const collection = database.collection("comments");

  collection.findOne({ "ref": req.params.ref }).then(entry => {
    res.send(entry);
  });

});

/* Sends user's followers as a list of usernames */
router.get("/followers/:username", (req, res) => {
  retrieveDocument("users", { username: req.params.username }, (doc) => {
    res.send(doc.follower_list);
  });
});

/* Sends people followed by users as a list of usernames */
router.get("/following/:username", (req, res) => {
  retrieveDocument("users", { username: req.params.username }, (doc) => {
    res.send(doc.following_list);
  });
});

router.get("/challenges", (req, res) => {
  let featured = ["Oak", "Ladybug"];
  let terms = new Array();
  featured.forEach(name => terms.push({ name }));
  let query = { $or: terms };
  let response = new Array();
  retrieveManyDocuments("challenges", query, cursor => {
    cursor.forEach(challenge => {
      response.push(challenge);
    })
    .then(() => {
      res.send(response);
    });
  });
});

router.get("/pinpoints", (req, res) => {
  let response = [
    { type: "photo", ref: "24701358208326510000" },
    { type: "photo", ref: "45641610956516400000" },
    { type: "photo", ref: "2" }
  ];
  res.send(response);
});

module.exports = router;
