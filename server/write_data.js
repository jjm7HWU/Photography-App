const fs = require("fs");
const s3 = require("../objects/bucket");

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

module.exports = uploadImage;
