const express = require("express");
const bodyParser = require("body-parser");
const { createComment, followUser, heartPost } = require("../server/user_interaction");

const router = express.Router();

router.post("/", (req, res) => {

  console.log("Interact API");

  switch (req.body.action) {

    case "follow":
      followUser(req.body, response => res.send(response));
      break;

    case "comment":
      createComment(req.body, response => res.send(response));
      break;

    case "heart":
      heartPost(req.body, response => res.send(response));
      break;

    default:
      res.send({ success: false, message: "Invalid action type" });
      break;

  }


});

module.exports = router;
