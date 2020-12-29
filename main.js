const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
const server = http.createServer(app);

const mongoose = require("mongoose");

const { database } = require("./key");

dotenv.config();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/api"));
app.use("/photo", require("./routes/photo"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Listening on port " + PORT));
