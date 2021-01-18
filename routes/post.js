const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const { validateRegistration } = require("../server/validation");
const { createAccount } = require("../server/write_data");

const router = express.Router();

router.post("/register", (req, res) => {

  let response = validateRegistration(req.body);
  
  res.header("Access-Control-Allow-Origin", "*");
  res.send(response);

});

module.exports = router;
