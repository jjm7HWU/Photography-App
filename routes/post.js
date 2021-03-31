const express = require("express");
const fs = require("fs");
const multer = require("multer");

const { createAccount, includeInFollowerFeeds, handleUpload, includeOnProfile, writeUserKey } = require("../server/write_data");
const { performSearch } = require("../server/search");
const { randRef } = require("../server/standard_library");
const { validatePost, validateRegistration, validateSignIn } = require("../server/validation");
const { database } = require("../key");
const chunkHandler = require("../objects/chunkHandler");

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

  console.log("API POST: /post/upload");
  console.log(req.body);

  handleUpload(req.body, req.file.path, response => res.send(response));

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
      console.log("SUCCESSFUL LOGIN");
    }

    console.log("UNSUCCESSFUL LOGIN");

    // if registration details are valid then create account
    res.header("Access-Control-Allow-Origin", "*");
    res.send(response);

  })

});

router.post("/push-frame", (req, res) => {

  console.log("API POST: /post/push-frame");

  chunkHandler.addChunk(req.body.sourceUser, req.body.index, req.body.chunk, response => {
    res.send(response);
  });

});

router.post("/include-post-data", (req, res) => {

  chunkHandler.addPostData(req.body);

})

module.exports = router;
