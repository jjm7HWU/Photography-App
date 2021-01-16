/////// Page Router //////

const express = require("express");
const path = require("path");

const router = express.Router();

/* Serves page containing post according to reference number */
router.get("/photo/:ref", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", "photo.html"));

});

/* Serves page containing user profile */
router.get("/profile/:username", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", "profile.html"));

});

/* Serves page containing post according to reference number */
router.get("/leaderboard/:region", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", "leaderboard.html"));

});

module.exports = router;
