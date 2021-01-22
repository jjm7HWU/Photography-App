const express = require("express");

const { createAccount } = require("../server/write_data");
const { performSearch } = require("../server/search");
const { validateRegistration } = require("../server/validation");

const router = express.Router();

router.post("/search", (req, res) => {

  performSearch(req.body, response => {

    res.send(response);

  });

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
