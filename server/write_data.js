const fs = require("fs");
const s3 = require("../objects/bucket");
const { extractHashtags, getDate, randRef } = require("./standard_library");
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

/* Pushes image to S3 bucket and records image entry in photos database */
function postImage(file, submission) {

  // create random ref number and parse hashtags
  const ref = randRef();
  const hashtags = extractHashtags(submission.hashtags);

  // new entry for photos database
  const entry = {
    ref: ref,
    caption: submission.caption,
    poster: submission.poster,
    hearts: 0,
    location: submission.location,
    hashtags: hashtags
  };

  // save image in S3 bucket and store new entry in photos database
  pushImageToBucket(file.path, ref.toString());
  writeDocument(entry, "photos");

}

/* TEMP: Uploads image from file system to S3 bucket */
function pushImageToBucket(imageLocation, imageName) {

  const contents = fs.readFileSync(imageLocation);

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

/* Writes new document to database */
function writeDocument(doc, collectionName) {

  const collection = database.collection(collectionName);

  collection.insertOne(doc);

}

module.exports = { createAccount, postImage, pushImageToBucket };
