const mongoose = require("mongoose");

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.database = mongoose.connection;
