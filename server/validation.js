const { isValidEmail, isValidUsername, isValidPassword } = require("./standard_library");
const { retrieveDocument } = require("./read_data");
const { database } = require("../key");

/*
**  Returns whether or not user exists
**
*/
function userExists(username) {

  retrieveDocument("accounts", { username }, doc => {
    return (doc) ? true : false;
  });

}

function validatePost(submission) {
  return (submission.caption
      &&  submission.poster
      &&  submission.location
      &&  submission.hashtags
  );
}

/* Validates a user's registration attempt */
function validateRegistration(submission, next) {

  // function output
  let response = {
    valid: true,
    messages: {}
  };

  //// ensure form data has been submitted as text ////
  submission.email = submission.email.toString();
  submission.username = submission.username.toString();
  submission.password1 = submission.password1.toString();
  submission.password2 = submission.password2.toString();

  retrieveDocument("accounts", { "username": submission.username }, entry => {

    // username has already been taken
    if (entry) {
      response.valid = false;
      response.messages["username"] = "This username is already taken.";
    }
    // username is invalid
    else if (!isValidUsername(submission.username)) {
      response.valid = false;
      response.messages["username"] = "This username is invalid.";
    }

    retrieveDocument("accounts", { "email": submission.email }, entry => {

      // email has already been registered
      if (entry) {
        response.valid = false;
        response.messages["email"] = "This email is already associated with an account.";
      }
      // email is invalid
      else if (!isValidEmail(submission.email)) {
        response.valid = false;
        response.messages["email"] = "This email is invalid.";
      }

      // passwords do not match
      if (submission.password1 !== submission.password2) {
        response.valid = false;
        response.messages["password"] = "Passwords do not match.";
      }
      // password is invalid
      else if (!isValidPassword(submission.password1)) {
        response.valid = false;
        response.messages["password"] = "Passwords must be 8 – 32 characters in length.";
      }

      // user has not agreed to the terms of service and the privacy policy
      if (submission.checkbox !== true) {
        response.valid = false;
        response.messages["checkbox"] = "To sign up you must agree to our Terms of Service and Privacy Policy.";
      }

      next(response);

    });

  });
}

function validateSignIn(submission, next) {

  let response = {
    valid: true
  };

  retrieveDocument("accounts", { email: submission.email }, entry => {
    
    if (!entry) {
      response.valid = false;
      response.message = "E-mail or password is incorrect";
      next(response);
      return;
    }

    response.username = entry.username;

    next(response);

  });

}

module.exports = {
  validatePost,
  validateRegistration,
  validateSignIn
};
