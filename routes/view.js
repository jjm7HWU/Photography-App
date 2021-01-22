/////// Page Router //////

const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/search/", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", "search.html"));

});

router.get("/:page/:x", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", `${req.params.page}.html`));

});

module.exports = router;
