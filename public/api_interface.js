const URL = "http://localhost:5000";

function postMethodFetch(data, location, next) {
  fetch(URL + location, {
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

function getElement(id) {
  return document.getElementById(id);
}

function submitImageFile() {

  const fileInput = getElement("image-upload").files;

  console.log(fileInput);

  const submission = fileInput;

  postMethodFetch(submission, "/post/upload", res => {
    console.log(res);
  });

}

function getFeed() {

  const submission = {
    sourceUser: getElement("feed-username").value
  };

  postMethodFetch(submission, "/api_custom/feed", res => {
    console.log(res);
  });

}

function getNotifications() {

  const submission = {
    sourceUser: getElement("notifications-username").value
  };

  postMethodFetch(submission, "/api_custom/notifications", res => {
    console.log(res);
  });

}

function postComment() {

  const submission = {
    action: "comment",
    poster: getElement("comment-poster").value,
    comment: getElement("comment-comment").value,
    photoRef: parseInt(getElement("comment-photoRef").value)
  };

  postMethodFetch(submission, "/interact", res => {
    console.log(res);
  });

}
