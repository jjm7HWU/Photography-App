/* Returns element of specified id */
function element(id) {
  return document.getElementById(id);
}

/* Populates post content according to JSON data */
function renderPost(data) {
  element("post-image").src = `https://photography-app-content.s3.amazonaws.com/${data.ref}.${data.type}`;
  element("poster-username").innerHTML = data.poster;
  element("location").innerHTML = data.location;
  element("caption").innerHTML = data.caption;
  element("hearts").innerHTML = `${data.hearts}`;
}

/* Return photo reference number found in URL */
function getURLRef() {
  return window.location.pathname.split("/").pop();
}

window.onload = () => {

  // get photo reference number from URL
  const ref = getURLRef();

  // fetch JSON data to populate page: poster, caption, hearts, image location
  fetch("http://localhost:5000/api/photo/"+ref)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderPost(data);
  });

}
