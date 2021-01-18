/* Sends contents of registration form to create account */
function submitRegistration() {

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
  });

}
