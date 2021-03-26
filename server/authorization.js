const { retrieveDocument } = require("../server/read_data");

function keyBelongsToUser(key, username, next) {
  retrieveDocument("userkeys", { username, key }, (doc) => {
    console.log("userkeys");
    console.log(doc);
    if (doc) next(true);
    else next(false);
  });
}

module.exports = { keyBelongsToUser };
