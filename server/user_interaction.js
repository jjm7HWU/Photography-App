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

  next({ success: true, comment });

}

function followUser(interaction, next) {

  console.log("followUser");
  console.log(interaction)

  // TODO: create general function
  const collection = database.collection("users");

  if (interaction.value) {

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

    next({ success: true, value: true });

  }
  else {

    collection.findOneAndUpdate(
      { username: interaction.sourceUser },
      { $pull: { following_list: interaction.username } }
    );

    collection.findOneAndUpdate(
      { username: interaction.username },
      { $pull: { follower_list: interaction.sourceUser } }
    );

    next({ success: true, value: false });

  }
  
}

function heartPost(interaction, next) {

  console.log("likeContent");

  const collection = database.collection("photos");

  if (interaction.value) {

    collection.findOneAndUpdate(
      { ref: interaction.ref },
      { $addToSet: { heartsUsers: interaction.sourceUser } }
    );

    next({ hearted: true });

  }
  else {

    collection.findOneAndUpdate(
      { ref: interaction.ref },
      { $pull: { heartsUsers: interaction.sourceUser } }
    );

    next({ hearted: false });

  }

}

module.exports = {
  createComment,
  followUser,
  heartPost
};
