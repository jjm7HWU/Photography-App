const { retrieveDocument } = require("./read_data");
const { getDate, randRef } = require("./standard_library");
const { database } = require("../key");
const CHALLENGES = require("../assets/CHALLENGES");

const TASK_APPROVALS_REQUIRED = 3;

function submitTask(submission, next) {

  const username = submission.sourceUser;
  const ref = submission.ref;
  const challengeID = submission.challengeID;
  const taskIndex = submission.taskIndex;

  retrieveDocument("user_tasks", { username }, doc => {

    if (doc) {

      if (doc.started.findIndex(e => (e.username === username && e.challengeID === challengeID && e.taskIndex === taskIndex)) === -1 && doc.completed.findIndex(e => (e.username === username && e.challengeID === challengeID && e.taskIndex === taskIndex)) === -1) {

	retrieveDocument("challenges", { id: challengeID }, challenge => {

	  // taskIndex is a valid number
	  if (challenge && taskIndex < challenge.tasks.length) {

	    let submission = {
	      username,
	      ref,
	      challengeID,
	      taskIndex
	    };

	    database.collection("user_tasks").findOneAndUpdate(
	      { username },
	      { $push: { started: submission } }
	    );

	    submission = {
	      ...submission,
	      question: challenge.tasks[taskIndex].question,
	      yes: 0,
	      no: 0,
	      dunno: 0
	    };

	    database.collection("task_submissions").insertOne(submission);

	    next({ success: true, message: "Attempt submitted!" });

	  }
	  else {
	    next({ success: false, message: "This task does not exist" });
	  }
	});
      }
      else {
	next({ success: false, message: "This challenge has already been started or completed" });
      }
    }
    else {
      next({ success: false, message: "Cannot find challenge" });
    }

  });

}

function evaluateTaskSubmission(body, next) {

  console.log("So yeah?");

  const query = {
    username: body.username,
    ref: body.ref,
    challengeID: body.challengeID,
    taskIndex: body.taskIndex
  };

  let inc;
  if (body.verdict === "yes") {
    inc = { yes: 1 };
  }
  else if (body.verdict === "no") {
    inc = { no: 1 };
  }
  else if (body.verdict === "dunno") {
    inc = { dunno: 1 };
  }

  const collection = database.collection("task_submissions");
  collection.findOneAndUpdate(query, { $inc: inc });

  retrieveDocument("task_submissions", query, doc => {
    if (doc) determineAttemptStatus(doc);
    else console.log("Cant seem to find it");
  });

  next({ success: true, message: "evaluated task!!!" });

}

function determineAttemptStatus(attempt) {
  console.log("Determining submission status");
  if (attempt.yes >= TASK_APPROVALS_REQUIRED) {
    setAttemptResult(attempt, true);
  }
  else if (attempt.no >= TASK_APPROVALS_REQUIRED) {
    setAttemptResult(attempt, false);
  }
}

function setAttemptResult(attempt, bool) {

  const username = attempt.username;
  const ref = attempt.ref;
  const challengeID = attempt.challengeID;
  const taskIndex = attempt.taskIndex;

  const submissions = database.collection("task_submissions");
  const query = { username, ref, challengeID, taskIndex };

  submissions.findOneAndDelete(query);

  const userChallenges = database.collection("user_tasks");
  userChallenges.findOneAndUpdate(
    { username: attempt.username },
    { $pull: { started: { challengeID, taskIndex } } }
  );

  if (bool) {
    console.log("CHALLENGE COMPLETED!!!");
    checkForChallengeCompletion(attempt);
  }
  else {
    console.log("CHALLENGE FAILED!!!");
  }

}

function checkForChallengeCompletion(task) {

  const username = task.username;
  const ref = task.ref;
  const challengeID = task.challengeID;
  const taskIndex = task.taskIndex;
  const tasksRequired = CHALLENGES[challengeID].tasks.length;

  retrieveDocument("user_tasks", { username }, doc => {
    if (doc) {
      let sisterTasks = doc.completed.filter(t => (t.challengeID === challengeID));
      console.log("SISTER TASKS");
      console.log(sisterTasks);
      if (sisterTasks.length >= tasksRequired - 1) {
	completeChallenge(username, ref, challengeID, taskIndex);
      }
      completeTask(task);
    }
  });

}

function completeTask(task) {
  const collection = database.collection("user_tasks");
  const submission = {
    username: task.username,
    ref: task.ref,
    challengeID: task.challengeID,
    taskIndex: task.taskIndex
  };
  collection.findOneAndUpdate(
    { username: task.username },
    { $push: { completed: submission } }
  );
}

function completeChallenge(username, ref, challengeID, taskIndex) {

  const collection = database.collection("user_challenges");

  const submission = { challengeID, taskIndex };

  collection.findOneAndUpdate(
    { username },
    { $push: { completed: submission } }
  );

}

module.exports = {
  evaluateTaskSubmission,
  submitTask
};
