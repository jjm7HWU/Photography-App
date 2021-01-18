const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

// configure environment variables
dotenv.config();

// database object
const { database } = require("./key");

// static content in 'public' directory is served for website
app.use(express.static(path.join(__dirname, "public")));

// middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// initialise routes
app.use("/api", require("./routes/api"));
app.use("/post", require("./routes/post"));
app.use("/", require("./routes/view"));

// listen on port
const PORT = 5000;
server.listen(PORT, () => console.log("Listening on port " + PORT));
