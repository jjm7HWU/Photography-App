const { database } = require("../key");

/* Retrieves document that matches query */
function retrieveDocument(collectionName, query, next) {

  const collection = database.collection(collectionName);

  collection.findOne(query).then(doc => {
    next(doc);
  });

}

module.exports = { retrieveDocument };
