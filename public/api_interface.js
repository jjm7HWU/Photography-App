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

function chunkText(text) {
  const chunkSize = 20000;
  const chunks = new Array();
  for (let i = 0; i <= text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  chunks.push("#");
  return chunks;
}

function pushFrames() {

  const image = getElement("frame-text").value;
  const poster = getElement("frame-username").value;
  const caption = getElement("frame-caption").value;
  const location = getElement("frame-location").value;
  const hashtags = getElement("frame-hashtags").value;

  const array = chunkText(image);

  const i = new Array(array.length).fill(0).map((e,i) => i);
  const indices = new Array();

  for (let x = 0; x < array.length; x++) {
    let r = Math.floor(Math.random() * i.length);
    indices.push(i[r]);
    i.splice(r,1);
  }

  console.log(array);
  console.log(indices);

  postMethodFetch({ poster, caption, location, hashtags }, "/post/include-post-data", response => {
    console.log(response);

    indices.forEach(v => {

      const submission = {
	sourceUser: getElement("frame-username").value,
	index: v,
	chunk: array[v]
      };

      console.log(submission);

      postMethodFetch(submission, "/post/push-frame", res => {
	// console.log(res);
      });
    
      console.log("Sent frame " + v);

    });

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

function getTasksDone() {

  const submission = {
    sourceUser: getElement("tasks-done-username").value
  };

  postMethodFetch(submission, "/api_custom/tasks-done", res => {
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
