const express = require("express");
const bodyParser = require("body-parser");
const { createComment, followUser } = require("../server/user_interaction");

const router = express.Router();

router.post("/", (req, res) => {

  console.log("Interact API");

  switch (req.body.action) {

    case "follow":
      followUser(req.body);
      break;

    case "comment":
      createComment(req.body);
      break;

  }

  res.send({ success: true });

});

module.exports = router;
