/*
**  This module contains all the APIs that are custom to each user. i.e. feed,
**  account settings, etc.
**
**  Documentation can be found in :/docs/api_custom.md
*/

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const { retrieveDocument } = require("../server/read_data");
const { pushImageToBucket } = require("../server/write_data");

const router = express.Router();
const upload = multer({ dest: "posts/" });

/*
**  Returns user feed
*/
router.post("/feed", (req, res) => {

  // get username of user making request
  const username = req.body.sourceUser;

  // search for user's feed
  retrieveDocument("feeds", { username }, doc => {

    // if found send feed to user
    if (doc) {
      res.send({
        success: true,
        feed: doc.feed
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

  // get username of user making request
  const username = req.body.sourceUser;

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

/*
**  Submit changes to account
*/
router.post("/account", upload.single("avatar"), (req, res) => {

  console.log(req.body);

  if (req.file) {
    pushImageToBucket(req.file.path, "profile_pictures/"+req.body.username);
  }

  res.send({ success: true });

});

module.exports = router;
