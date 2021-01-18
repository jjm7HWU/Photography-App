const { database } = require("../key");

/* TEMP: To be implement properly */
function isValidEmail(email) {
  if (typeof email !== "string") return false;
  if (!email.includes("@")) return false;
  if (email.charAt(0) === "@" || email.split("").pop() === "@") return false;
  return true;
}

/* TO BE IMPLEMENTED */
function userExists(username) {
  return false;
}

/* TO BE IMPLEMENTED */
function isValidUsername(username) {
  return true;
}

/* Validates a user's registeration attempt */
function validateRegistration(submission) {

  submission.email = submission.email.toString();
  submission.username = submission.username.toString();
  submission.password1 = submission.password1.toString();
  submission.password2 = submission.password2.toString();

  // function output
  let response = {
    valid: true,
    messages: {}
  };

  //// username must be unique and may only contain certain characters ////
  if (userExists(submission.username)) {
    response.valid = false;
    response.messages["username"] = "This username is already taken.";
  }
  else if (!isValidUsername(submission.username)) {
    response.valid = false;
    response.messages["username"] = "This username is invalid.";
  }

  //// must be valid email ////
  if (!isValidEmail(submission.email)) {
    response.valid = false;
    response.messages["email"] = "This email is invalid.";
  }

  //// passwords must match and meet length requirement ////
  if (submission.password1 !== submission.password2) {
    response.valid = false;
    response.messages["password"] = "Passwords do not match.";
  }
  else if (submission.password1.length < 8 || submission.password1.length > 32) {
    response.valid = false;
    response.messages["password"] = "Passwords must be 8 – 32 characters in length.";
  }

  //// user must have agreed to the terms of service and the privacy policy ////
  if (submission.checkbox !== true) {
    response.valid = false;
    response.messages["checkbox"] = "To sign up you must agree to our Terms of Service and Privacy Policy.";
  }

  return response;

}

module.exports = { validateRegistration }
