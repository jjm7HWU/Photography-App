/* Gets search query from URL */
function getSearchQuery() {
  let queries = new URLSearchParams(window.location.search);
  queries = queries.get("v").split(" ");
  if (queries.length === 1 && queries[0].length === 0)
    queries.pop();
  return queries;
}

/* Render search results inside of results container */
function renderSearchResults(results) {
  
  let container = getElement("search-results");

  for (let result of results) {

    switch (result.type) {

      case "post":
        appendPosts(container, result.data);
        break;

      case "profile":
        // TODO
        break;

      case "challenge":
	container.innerHTML = container.innerHTML + renderChallenges(result.data);
	break;

    }

  }
}

window.onload = () => {

  // get search query from the URL
  let query = getSearchQuery();

  let querySubmission = {
    sourceUser: "Mitch55",
    terms: query
  };

  // send query to database and render response
  postMethodFetch(querySubmission, "/post/search", res => {
    console.log(res);
    renderSearchResults(res);
  });

};
