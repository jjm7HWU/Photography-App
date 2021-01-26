/* Renders registration errors underneath invalid inputs */
function renderRegistrationResponse(response) {

  getElement("email-form-error").innerHTML = response.messages["email"] || "";
  getElement("username-form-error").innerHTML = response.messages["username"] || "";
  getElement("password-form-error").innerHTML = response.messages["password"] || "";
  getElement("checkbox-form-error").innerHTML = response.messages["checkbox"] || "";

}

/* Sends contents of registration form to create account */
function submitRegistration() {

  console.log("Submitting");

  // get form input data
  let submission = {
    username: getElement("username").value,
    email: getElement("email").value,
    password1: getElement("password1").value,
    password2: getElement("password2").value,
    checkbox: getElement("checkbox").checked
  };

  // send entered data to server
  postMethodFetch(submission, "/post/register", res => {
    console.log(res);
    renderRegistrationResponse(res);
  });

}
