const { database } = require("../key");

/*
**  Retrieves first document in collection that matches query
**
**  @param collectionName - name of collection to search
**  @param query - search query
**  @param next - next function call
*/
function retrieveDocument(collectionName, query, next) {

  const collection = database.collection(collectionName);

  collection.findOne(query).then(doc => {
    next(doc);
  });

}

/*
**  Retrieves all documents in collection that matches query
**
**  @param collectionName - name of collection to search
**  @param query - search query
**  @param next - next function call
*/
function retrieveManyDocuments(collectionName, query, next) {

  const collection = database.collection(collectionName);

  const cursor = collection.find(query, {});

  next(cursor);

}

module.exports = { retrieveDocument, retrieveManyDocuments };
