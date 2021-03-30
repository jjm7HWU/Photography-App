/*
**  This module contains all the APIs that are custom to each user. i.e. feed,
**  account settings, etc.
**
**  Documentation can be found in :/docs/api_custom.md
*/

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const { keyBelongsToUser } = require("../server/authorization");
const { retrieveDocument, retrieveManyDocuments } = require("../server/read_data");
const { pushImageToBucket, submitTask } = require("../server/write_data");
const { database } = require("../key");

const router = express.Router();
const upload = multer({ dest: "posts/" });

/*
**  Returns user feed
*/
router.post("/feed", (req, res) => {

  console.log("API POST: /feed");
  console.log(req.body);

  // get username of user making request
  const username = req.body.sourceUser;

  // search for user's feed
  retrieveDocument("feeds", { username }, doc => {

    // if found send feed to user
    if (doc) {
      retrieveDocument("challenge_submissions", {}, challenge => {
	if (challenge) {
	  challenge = {
	    type: "review",
	    question: "Is this question lying?",
	    ref: challenge.ref
	  }
	  doc.feed.push(challenge);
	}
	res.send({
	  success: true,
	  feed: doc.feed
	});
      });
    }
    // otherwise, send unsuccessful message
    else {
      res.send({ success: false });
    }

  });

});

/*
**  Returns user notifications
*/
router.post("/notifications", (req, res) => {

  console.log("/notifications");
  console.log(req.body);

  // get username of user making request
  const username = req.body.sourceUser;

  keyBelongsToUser(req.body.key, username, (authorized) => {

    if (!authorized) {
      res.send({ success: false, reason: "Access denied" });
      return;
    }

    // search for user's notifications
    retrieveDocument("notifications", { username }, doc => {

      // if found send notifications to user
      if (doc) {
	res.send({
	  success: true,
	  unseen: doc.unseen,
	  seen: doc.seen
	});
      }
      // otherwise, send unsuccessful message
      else {
	res.send({ success: false });
      }

    });

  });

});

router.post("/challenges", (req, res) => {
  console.log("API POST: /challenges");
  console.log(req.body);

  retrieveManyDocuments("challenges", {}, cursor => {
    let challenges = new Array();
    cursor.forEach(entry => challenges.push(entry))
    .then(() => res.send({ label: "challenges", challenges }))
  })

});

router.post("/submit-task", (req, res) => {

  console.log("API POST: /submit-task");
  console.log(req.body);

  submitTask(req.body, response => res.send(response));

});

/*
**  TODO: Submit changes to account
*/
router.post("/account", upload.single("avatar"), (req, res) => {

  console.log("/account");
  console.log(req.body);

  // change profile picture
  if (req.file) {
    pushImageToBucket(req.file.path, "profile_pictures/"+req.body.username);
  }

  const collection = database.collection("users");

  collection.findOneAndUpdate(
    { username: req.body.username },
    { $set: { area: req.body.area, country: req.body.country, bio: req.body.bio } },
    { upsert: true }
  );

  res.send({ success: true });

});

module.exports = router;
