const express = require("express");
const mongoose = require("mongoose");

const path = require("path");

const router = express.Router();

/* Serves page containing post according to reference number */
router.get("/:ref", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", "photo", "index.html"));

});

module.exports = router;
