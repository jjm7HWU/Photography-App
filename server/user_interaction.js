const mongoose = require("mongoose");
const { getDate } = require("../server/standard_library");
const { notifyUser } = require("../server/write_data");
const { database } = require("../key");

function createComment(interaction, next) {

  console.log("createComment");

  const comment = {
    poster: interaction.sourceUser,
    comment: interaction.comment,
    date: getDate()
  };

  console.log(comment);

  // TODO: create general function
  const collection = database.collection("photos");

  collection.findOneAndUpdate(
    { ref: interaction.ref },
    { $push: { commentsUsers: comment } }
  );

  next({ success: true });

}

function followUser(interaction, next) {

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

  notifyUser(interaction.username, {
    type: "new_follower",
    username: interaction.sourceUser
  });

  next({ success: true });
  
}

function heartPost(interaction, next) {

  console.log("likeContent");

  const collection = database.collection("photos");

  collection.findOneAndUpdate(
    { ref: interaction.ref },
    { $addToSet: { heartsUsers: interaction.sourceUser } }
  );

  next({ success: true });

}

module.exports = {
  createComment,
  followUser,
  heartPost
};
