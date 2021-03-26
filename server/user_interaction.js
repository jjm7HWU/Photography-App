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
    { ref: interaction.photoRef },
    { $push: { comments: comment } }
  );

}

function followUser(interaction) {

  console.log("followUser");
  console.log(interaction)

  // TODO: create general function
  const collection = database.collection("users");

  collection.findOneAndUpdate(
    { username: interaction.username },
    { $addToSet: { follower_list: interaction.sourceUser } }
  );

  collection.findOneAndUpdate(
    { username: interaction.sourceUser },
    { $addToSet: { following_list: interaction.username } }
  );
  
}

module.exports = {
  createComment,
  followUser
};
