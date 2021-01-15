const express = require("express");

const path = require("path");

const router = express.Router();

/* Serves page containing post according to reference number */
router.get("/:ref", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", "profile", "index.html"));

});

module.exports = router;
