const express = require("express");

const { validateRegistration } = require("../server/validation");
const { createAccount } = require("../server/write_data");

const router = express.Router();

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
