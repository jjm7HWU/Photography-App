const { retrieveDocument, retrieveManyDocuments } = require("./read_data");

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

  // create query to match all users found in search term
  let terms = [];
  search.terms.forEach(term => terms.push({ username: term }));
  let query = { $or: terms };

  // search for users according to query
  retrieveManyDocuments("users", query, cursor => {

    // user search results to be sent to the user
    let userResults = {
      type: "profile",
      data: []
    };

    // record every user result in userResults
    cursor.forEach(entry => {
      userResults.data.push(entry.username);
    })
    .then(() => {

      // include user results in list of all results
      results.push(userResults);

      // create query to match all hashtags found in search term
      terms = [];
      search.terms.forEach(term => terms.push({ hashtag: term }));
      query = { $or: terms }

      // search for hashtags according to query
      retrieveManyDocuments("hashtags", query, cursor => {

        // hashtag search results to be sent to the user
        let hashtagResults = {
          type: "post",
          data: []
        };

        // record every hashtag result in userResults
        cursor.forEach(entry => {
          hashtagResults.data.push(entry.posts);
        })
        .then(() => {
          // include user results in list of all results
          results.push(hashtagResults);

	  terms = [];
	  search.terms.forEach(term => terms.push({ name: term }));
	  query = { $or: terms };

	  retrieveManyDocuments("challenges", query, cursor => {

	    let challengeResults = {
	      type: "challenge",
	      data: []
	    };

	    // record every challenge result in challengeResults
	    cursor.forEach(entry => {
	      challengeResults.data.push(entry);
	    })
	    .then(() => {
	      results.push(challengeResults);
	      // pass final search results to next function
	      next(results);
	    })

	  })

        });

      });

    });

  });

}

module.exports = {
  performSearch
};
