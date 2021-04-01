/*
//  API that returns JSON data used for display in the app and website
*/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("../key");
const { retrieveDocument, retrieveManyDocuments } = require("../server/read_data");

const router = express.Router();

function extractPost(post, username) {

  return {
    ref: post.ref,
    caption: post.caption,
    poster: post.poster,
    hearts: post.heartsUsers.length,
    comments: post.commentsUsers.length,
    commentsArray: post.commentsUsers,
    location: post.location,
    hashtags: post.hashtags,
    hearted: (username && post.heartsUsers.includes(username)),
    longitude: post.lon,
    latitude: post.lat
  };

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
      posts.push(extractPost(entry, req.query.username));
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
	rank: entry.rank,
	isFollowing: (req.query.username && entry.follower_list.includes(req.query.username)) ? true : false
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

  retrieveManyDocuments("leaderboard", {}, cursor => {

    let leaderboard = new Array();

    cursor.forEach((item, position) => {
      let entry = {
	username: item.username,
	position: item.position,
	points: item.points
      };
      console.log(entry)
      leaderboard.push(entry);
    })
    .then(() => {
      res.send(leaderboard);
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
  const response = new Array();
  retrieveManyDocuments("photos", {}, cursor => {
    cursor.forEach(entry => {
      if (entry.lon !== undefined && entry.lat !== undefined) {
	response.push(extractPost(entry, req.query.username));
      }
    })
    .then(() => {
      res.send(response);
    });
  });
});

module.exports = router;
