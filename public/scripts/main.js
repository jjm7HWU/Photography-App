/* Returns element of specified id */
function getElement(id) {
  return document.getElementById(id);
}

/* Returns name of current page according to URL */
function getPageName() {
  return window.location.pathname.split("/").pop();
}

/* Directs user to search page for query entered in search bar */
function directToSearchPage() {
  let value = getElement("search-input").value;
  let query = joinAsQuery(value);
  window.location = `${DOMAIN_NAME}/search/query?v=${query}`;
}

/* Formats string of text for inclusion in URL query */
function joinAsQuery(text) {
  query = text.split(" ").join("+");
  return query;
}

/* Directs user to search page if RETURN is pressed */
/* Only called when search box is being used */
function checkKeySearch(event) {
  if (event.keyCode === 13) {
    directToSearchPage();
  }
}

/* Populates element according to JSON data */
function renderElement(elem, data) {

  // create iterable array of attribute name-value pairs
  let attributes = Object.entries(data);

  // iterate through each name-value pair
  attributes.forEach(attribute => {

    // ignore _id attribute
    if (attribute[0] !== "_id") {

      // render child element with id matching name of attribute
      let a = getElementInContainerById(elem, attribute[0]);
      if(a) a.innerHTML = attribute[1];

    }

  });

}

/* Finds element in container that matches id */
function getElementInContainerById(container, id) {

  // get all children
  let children = container.getElementsByTagName("*");

  for (let child of children) {

    // element has been found
    if (child.id === id)
      return child;

    // div has been found
    else if (child.tagName === "DIV") {

      // make recursive call
      let element = getElementInContainerById(child, id);

      // element has been found
      if (element && element.id === id) return element;

    }
  }
  return null;
}

/*
**  Posts data to api at location using the fetch method
**
**  @param data - JSON body to be sent via POST method
**  @param pathname - pathname of api (e.g. /user/Hannah after server domain name)
*/
function postMethodFetch(data, pathname, next) {
  fetch(DOMAIN_NAME + pathname, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => next(response));
}

const DOMAIN_NAME = "http://localhost:5000";
const BUCKET_ADDRESS = "https://photography-app-content.s3.amazonaws.com"
