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
router.get("/photo/:refs", (req, res) => {

  console.log("API GET: /photo/:refs");
  console.log(req.params.refs);

  let refs = req.params.refs.split("+");
  refs = refs.map(ref => parseInt(ref));

  // create query to get all photos by reference number
  let terms = [];
  refs.forEach(term => terms.push({ ref: term }));
  let query = { $or: terms };

  retrieveManyDocuments("photos", query, cursor => {

    let posts = new Array();

    cursor.forEach(entry => {
      posts.push({
	ref: entry.ref,
	caption: entry.caption,
	poster: entry.poster,
	hearts: entry.heartsUsers.length,
	comments: entry.commentsUsers.length,
	commentsArray: entry.commentsUsers,
	location: entry.location,
	hashtags: entry.hashtags,
	hearted: (req.query.username && entry.heartsUsers.includes(req.query.username))
      });
    })
    .then(() => {
      res.send(posts);
    });

  })
  

});

/* Sends user information */
router.get("/user/:username", (req, res) => {

  const collection = database.collection("users");

  collection.findOne({ "username": req.params.username }).then(entry => {

    let response;

    if (entry) {
      response = {
	username: entry.username,
	area: entry.area,
	country: entry.country,
	joindate: entry.joindate,
	bio: entry.bio,
	followers: entry.follower_list.length,
	following: entry.following_list.length,
	points: entry.points,
	rank: entry.rank
      };
    }
    else {
      response = { success: false, message: "cannot find user " + req.params.username };
    }

    res.send(response);

  });

});

router.get("/activity/:username", (req, res) => {

  console.log("API GET: /activity/:username");
  console.log(req.params.username);

  retrieveDocument("activity", { username: req.params.username }, doc => {
    if (doc) res.send({ activity: doc.activity });
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

  const collection = database.collection("photos");

  collection.findOne({ "ref": req.params.ref }).then(entry => {
    res.send({
      enabled: true,
      comments: commentsUsers
    });
  });

});

/* Sends user's followers as a list of usernames */
router.get("/followers/:username", (req, res) => {
  console.log("API GET: /followers/:username");
  console.log(req.params.username);
  retrieveDocument("users", { username: req.params.username }, (doc) => {
    if (doc) res.send(doc.follower_list);
    else res.send({ message: "No user found" });
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
