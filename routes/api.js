const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/marmot", (req, res) => {
  res.send("<img src='https://www.hcn.org/blogs/range/the-meaning-of-marmot-whistles/marmot-buddy-png/@@images/e3f15354-7bd0-43da-b05f-52b74931337d.png'/>");
});

router.get("/puffin", (req, res) => {
  res.send("<img src='https://www.johnogroat-journal.co.uk/_media/img/PJVDKVM4XO2WU6GO69EN.jpg'/>");
});

module.exports = router;
