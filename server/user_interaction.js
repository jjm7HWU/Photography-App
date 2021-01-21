const mongoose = require("mongoose");
const { database } = require("../key");

function createComment(interaction) {

  const comment = {
    poster: interaction.poster,
    comment: interaction.comment,
    date: ""
  };

  // TODO: create general function
  const collection = database.collection("comments");

  collection.findOneAndUpdate(
    { ref: 2 },
    { $push: { comments: comment } }
  );

}

function followUser(interaction) {

  // TODO: create general function
  const collection = database.collection("users");

  collection.findOneAndUpdate(
    { username: interaction.username },
    { $push: { follower_list: interaction.sourceUser } }
  );

}

module.exports = {
  createComment,
  followUser
};
