const fs = require("fs");
const s3 = require("../objects/bucket");
const { retrieveDocument } = require("./read_data");
const { extractHashtags, getDate, randRef } = require("./standard_library");
const { database } = require("../key");
const bcryptjs = require("bcryptjs");

/*
**  Creates new user account in accounts collection
**
**  @param data - object containing username, email, and password of new account
*/
function createAccount(data) {

  //// hash password ////
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(data.password1, salt);

  //// record new account in collection ////
  const entry = {
    email: data.email,
    username: data.username,
    password: hash
  };

  const accounts = database.collection("accounts");
  accounts.insertOne(entry);

  // TODO: create new key
  const userkeys = database.collection("userkeys");
  userkeys.insertOne({ username: data.username, key: "123" });

  // create activity document
  const activity = database.collection("activity");
  activity.insertOne({ username: data.username, activity: [] });

  // create notifications document
  const notifications = database.collection("notifications");
  notifications.insertOne({ username: data.username, unseen: [], seen: [] });

  // create feed document
  const feed = database.collection("feeds");
  feed.insertOne({ username: data.username, feed: [] });

  // create tasks document
  const tasks = database.collection("user_tasks");
  tasks.insertOne({ username: data.username, started: [], completed: [] });

  // create challenges document
  const challenges = database.collection("user_challenges");
  challenges.insertOne({ username: data.username, started: [], completed: [] });

  createNewUser(data.username);

  console.log("New account registered: " + entry.username);

}

/*
**  Creates new user entry in users database
**
**  @param username - username of new user
*/
function createNewUser(username) {

  // get users collection
  const collection = database.collection("users");

  // create new entry in collection
  collection.insertOne({
    username,
    country: "",
    area: "",
    joindate: getDate(),
    bio: "",
    rank: 1,
    points: 0,
    follower_list: [],
    following_list: []
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
    { $push: { feed: { type: "post", ref } } }
  );

}

function notifyUser(username, notification) {

  const collection = database.collection("notifications");

  collection.findOneAndUpdate(
    { username },
    { $push: { unseen: notification } }
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

function handleUpload(caption, poster, location, hashtags, filePath) {

  const body = { caption, poster, location, hashtags };

  // if submission is valid then post image to the site
  if (validatePost(body)) {

    // post image and pass new post's reference number to next function
    postImage(filePath, body, ref => {

      // add to profile
      includeOnProfile("post", ref, req.body.poster);

      // place photo in followers's feeds
      includeInFollowerFeeds(ref, req.body.poster);

      // send poster success message and ref number of new post
      res.send({
        success: true,
        ref
      });

    });
  }
  // otherwise send error messages
  else {
    // TODO
    res.send({ success: false });
  }

}

function uploadBase64Image(image, postData) {

  console.log("UPLOADING BASE 64 IMAGE");
  console.log(image);
  console.log(image.substring(0,100));
  console.log("...");
  console.log(image.substring(image.length-100,image.length));

  console.log(postData);

}

/*
**  Pushes image to S3 bucket and records image entry in photos database
**  Passes ref of newly uploaded photo to next function
**
**  @param file - system file of photo to upload
**  @param submission - entry data for post. e.g. caption, poster, etc.
**  @param next - function to pass ref of new post to
*/
function postImage(path, submission, next) {

  // create random ref number and parse hashtags
  const ref = randRef();
  const hashtags = extractHashtags(submission.hashtags);

  // new entry for photos database
  const photosEntry = {
    ref: ref,
    caption: submission.caption,
    poster: submission.poster,
    hearts: 0,
    comments: 0,
    location: submission.location,
    hashtags: hashtags,
    heartsUsers: [],
    commentsUsers: []
  };

  // new entry for comments database
  const commentsEntry = {
    ref: ref,
    enabled: true,
    comments: []
  };

  // save image in S3 bucket and store new entry in photos database
  pushImageToBucket(path, "photos/"+ref.toString());
  writeDocument(photosEntry, "photos");
  writeDocument(commentsEntry, "comments");
  recordHashtags(ref, hashtags);

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

/*
**  Records hashtags included in post in hashtags database
**
**  @param ref - reference number of post with hashtags
**  @param hashtags - list of hashtags included in post
*/
function recordHashtags(ref, hashtags) {

  const collection = database.collection("hashtags");

  hashtags.forEach(hashtag => {

    collection.findOneAndUpdate(
      { hashtag },
      { $push: { posts: ref } },
      { upsert: true }
    );

  });

}

/*
**  Writes new document to collection
**
**  @param doc - new document to be added to collection
**  @param collectionName - name of collection to add document to
*/
function writeDocument(doc, collectionName) {

  // get collection by name
  const collection = database.collection(collectionName);

  // if collection found then add new document
  if (collection) collection.insertOne(doc);

}

function writeUserKey(username, key) {
  database.collection("userkeys").findOneAndUpdate({ username }, { $set: { key } });
}

module.exports = {
  createAccount,
  handleUpload,
  includeInFollowerFeeds,
  includeOnProfile,
  notifyUser,
  postImage,
  pushImageToBucket,
  uploadBase64Image,
  writeUserKey
};
