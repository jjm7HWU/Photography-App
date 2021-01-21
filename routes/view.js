/////// Page Router //////

const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/:page/:x", (req, res) => {

  res.sendFile(path.join(__dirname, "..", "views", `${req.params.page}.html`));

});

module.exports = router;
