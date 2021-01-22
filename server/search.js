const { retrieveDocument } = require("./read_data");

/* TEMP: Only searches for first term. To be implemented fully. */
/* Searches collections for entries matching search terms */
/* Passes results to next function */
function performSearch(search, next) {

  // function output - collection of all results
  let results = new Array();

  if (search.terms.length === 0) {
    next(results);
    return;
  }

  // search for username matching (first) term
  retrieveDocument("users", { username: search.terms[0] }, doc => {

    if (doc) {
      results.push({
        type: "profile",
        data: doc
      });
    }

    // search for hashtags matching (first) term
    retrieveDocument("hashtags", { hashtag: search.terms[0] }, doc => {

      if (doc.posts) {
        results.push({
          type: "post",
          data: doc.posts
        });
      }

      next(results);

    });

  });

}

module.exports = {
  performSearch
};
