const fs = require("fs");
const s3 = require("../objects/bucket");
const { getDate } = require("./standard_library");
const { database } = require("../key");
const bcryptjs = require("bcryptjs");

/* Creates new user account in accounts database */
function createAccount(data) {

  //// hash password ////
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(data.password1, salt);

  //// record new account in database ////
  const entry = {
    email: data.email,
    username: data.username,
    password: hash
  };

  const collection = database.collection("accounts");
  collection.insertOne(entry);

  createNewUser(data.username);

  console.log("New account registered: " + entry.username);

}

function createNewUser(username) {

  const collection = database.collection("users");

  collection.insertOne({
    username,
    country: "",
    area: "",
    joindate: getDate(),
    bio: "",
    rank: 1,
    points: 0,
    followers: 0,
    following: 0
  });

}

/* TEMP: Uploads image from file system */
function uploadImage(imageName) {

  const contents = fs.readFileSync(imageName);

  const params = {
    Bucket: "photography-app-content",
    Key: imageName,
    Body: contents
  };

  s3.upload(params, function(err, data) {
    if (err) throw err;
    console.log("Image uploaded");
  });

}

module.exports = { createAccount, uploadImage };
