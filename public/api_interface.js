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

function getFeed() {

  const submission = {
    sourceUser: getElement("feed-username").value
  };

  postMethodFetch(submission, "/api_custom/feed", res => {
    console.log(res);
  });

}

function getChallenges() {

  const submission = {
    sourceUser: getElement("challenges-username").value,
    key: "123"
  };

  postMethodFetch(submission, "/api_custom/challenges", res => {
    console.log(res);
  });

}

function submitTask() {

  console.log("click");

  const submission = {
    sourceUser: getElement("submit-task-username").value,
    ref: parseInt(getElement("submit-task-ref").value),
    challengeID: parseInt(getElement("submit-task-challenge-id").value),
    taskIndex: parseInt(getElement("submit-task-task-index").value)
  };

  console.log(submission);


  postMethodFetch(submission, "/api_custom/submit-task", res => {
    console.log(res);
  });

}

function evaluateTaskSubmission() {

  const submission = {
    sourceUser: getElement("evaluate-task-source-user").value,
    username: getElement("evaluate-task-username").value,
    ref: parseInt(getElement("evaluate-task-ref").value),
    challengeID: parseInt(getElement("evaluate-task-challenge-id").value),
    taskIndex: parseInt(getElement("evaluate-task-task-index").value),
    verdict: getElement("evaluate-task-verdict").value
  };

  console.log(submission);


  postMethodFetch(submission, "/api_custom/evaluate-task-submission", res => {
    console.log(res);
  });

}



function getNotifications() {

  const submission = {
    sourceUser: getElement("notifications-username").value,
    key: "123"
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
