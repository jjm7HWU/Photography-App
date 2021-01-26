const fs = require("fs");
const s3 = require("../objects/bucket");
const { retrieveDocument } = require("./read_data");
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

/*
**  Adds post to feeds of all of user's followers
**
**  @param ref - reference number of post to include in feeds
**  @param username - username of user whose followers's feeds are to be updated
*/
function includeInFollowerFeeds(ref, username) {

  // get user's account
  retrieveDocument("users", { username }, doc => {

    // iterate through user's followers
    doc.follower_list.forEach(follower => {

      // and add post to each follower's feed
      includeInFeed(ref, follower);

    });

  });

}

/*
**  Adds post to user's feed
**
**  @param ref - reference number of post to be included
**  @param username - username of user whose feed is to be updated
*/
function includeInFeed(ref, username) {

  const collection = database.collection("feeds");

  // get user feed add post
  collection.findOneAndUpdate(
    { username },
    { $push: { feed: { type: "post", username: "Alfonso", ref } } }
  );

}

/*
**  Adds post to user profile - may be a new post, a shared post, etc.
**
**  @param type - feature type. e.g. post, share
**  @param ref - reference number of post to include
**  @param username - username of user whose profile is to be updated
*/
function includeOnProfile(type, ref, username) {

  const collection = database.collection("activity");

  collection.findOneAndUpdate(
    { username },
    { $push: { activity: { type, ref } } }
  );

}

/*
**  Pushes image to S3 bucket and records image entry in photos database
**  Passes ref of newly uploaded photo to next function
**
**  @param file - system file of photo to upload
**  @param submission - entry data for post. e.g. caption, poster, etc.
**  @param next - function to pass ref of new post to
*/
function postImage(file, submission, next) {

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

  next(ref);

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

module.exports = {
  createAccount,
  includeInFollowerFeeds,
  includeOnProfile,
  postImage,
  pushImageToBucket
};
