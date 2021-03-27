const express = require("express");
const fs = require("fs");
const multer = require("multer");

const { createAccount, includeInFollowerFeeds, includeOnProfile, postImage, writeUserKey } = require("../server/write_data");
const { performSearch } = require("../server/search");
const { randRef } = require("../server/standard_library");
const { validatePost, validateRegistration, validateSignIn } = require("../server/validation");
const { database } = require("../key");

const router = express.Router();
const upload = multer({ dest: "posts/" });

/* Handles search queries */
router.post("/search", (req, res) => {

  performSearch(req.body, response => {

    res.send(response);

  });

});

/* Handles photo upload */
/* Poster sends post data (image, caption, location, hashtags) and if valid */
/* then new post is created  */
router.post("/upload", upload.single("avatar"), (req, res) => {

  // if submission is valid then post image to the site
  if (validatePost(req.body)) {

    // post image and pass new post's reference number to next function
    postImage(req.file, req.body, ref => {

      // add to profile
      includeOnProfile("post", ref, req.body.poster);

      // place photo in followers's feeds
      includeInFollowerFeeds(ref, req.body.poster);

      // send poster success message and ref number of new post
      res.send({
        success: true,
        ref
      });

    });
  }
  // otherwise send error messages
  else {
    // TODO
    res.send({ success: false });
  }
});

/* Handles registration attempts */
router.post("/register", (req, res) => {

  console.log("API POST: /register")

  // if registration details are valid then create account
  validateRegistration(req.body, response => {

    if (response.valid) createAccount(req.body);

    res.header("Access-Control-Allow-Origin", "*");
    res.send(response);
  });

});

router.post("/sign-in", (req, res) => {

  const collection = database.collection("userkeys");

  validateSignIn(req.body, response => {

    if (response.valid) {
      const key = randRef();
      response.key = key;
      writeUserKey(response.username, key);
    }

    // if registration details are valid then create account
    res.header("Access-Control-Allow-Origin", "*");
    res.send(response);

  })

});

module.exports = router;
