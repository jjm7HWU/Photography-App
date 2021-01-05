/*
//  Amazon S3 object used to interact with bucket containing app content
*/

const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = s3;
