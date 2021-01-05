const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
const server = http.createServer(app);

const mongoose = require("mongoose");

// database object
const { database } = require("./key");

// configure environment variables
dotenv.config();

// static content in 'public' directory is served for website
app.use(express.static(path.join(__dirname, "public")));

// initialise routes
app.use("/api", require("./routes/api"));
app.use("/photo", require("./routes/photo"));

// listen on port
const PORT = 5000;
server.listen(PORT, () => console.log("Listening on port " + PORT));
