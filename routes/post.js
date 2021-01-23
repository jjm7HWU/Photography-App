const express = require("express");
const fs = require("fs");
const multer = require("multer");

const { createAccount, postImage } = require("../server/write_data");
const { performSearch } = require("../server/search");
const { validatePost, validateRegistration } = require("../server/validation");

const upload = multer({ dest: "posts/" });

const router = express.Router();

/* Handles search queries */
router.post("/search", (req, res) => {

  performSearch(req.body, response => {

    res.send(response);

  });

});

/* Handles photo upload */
router.post("/upload", upload.single("avatar"), (req, res) => {

  // if submission is valid then post image to the site
  if (validatePost(req.body)) {
    postImage(req.file, req.body);
    res.send({ success: true });
  }
  // otherwise send error messages
  else {
    // TODO
    res.send({ success: false });
  }
});

/* Handles registration attempts */
router.post("/register", (req, res) => {

  // if registration details are valid then create account
  validateRegistration(req.body, response => {

    if (response.valid) createAccount(req.body);

    res.header("Access-Control-Allow-Origin", "*");
    res.send(response);
  });

});

module.exports = router;
