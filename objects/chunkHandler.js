const { uploadBase64Image } = require("../server/write_data");

class ChunkHandler {

  constructor() {
    
    this.uploads = [];
    this.postsData = [];

  }

  addChunk(username, index, chunk, next) {

    // console.log("Adding chunk");
    // console.log(index+" / "+chunk);

    let upload = this.uploads[username];

    if (!upload) return;

    if (chunk.slice(-1) === "#") {
      upload.desiredCount = index + 1;
    }

    upload.chunks[index] = chunk;
    upload.chunkCount = upload.chunkCount + 1;

    let response = { success: true, completed: false };
    if (upload.chunkCount === upload.desiredCount) {
      console.log("Chunking complete");
      console.log("Final size = " + upload.desiredCount);
      response.completed = true;
      let string = upload.chunks.join("");
      string = string.substring(0,string.length-1);
      let postData = this.postsData[username];
      uploadBase64Image(string, postData, response => console.log(response));
      delete this.uploads[username];
      delete this.postsData[username];
    }

    next(response);


  }

  addPostData(body) {
    const caption = body.caption;
    const poster = body.poster;
    const location = body.location;
    const hashtags = body.hashtags;
    const upload = {
      username: poster,
      chunks: new Array(),
      chunkCount: 0,
      desiredCount: -1
    };
    this.uploads[poster] = upload;
    this.postsData[poster] = { caption, poster, location, hashtags };
  }

}

let chunkHandler = new ChunkHandler();
module.exports = chunkHandler;
