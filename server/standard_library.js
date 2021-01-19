/* Returns date (e.g. "Jun 03 2020") */
function getDate() {
  const date = Date().split(" ");
  return `${date[1]} ${date[2]} ${date[3]}`;
}

/* Determines whether email is valid */
/* TEMP: To be implemented properly */
function isValidEmail(email) {
  if (typeof email !== "string") return false;
  if (!email.includes("@")) return false;
  if (email.charAt(0) === "@" || email.split("").pop() === "@") return false;
  return true;
}

/* Determines whether username is valid */
function isValidUsername(username) {

  if (username.length > 24) return false;

  for (let char of username) {
    if (!isValidUsernameChar(char)) return false;
  }

  return true;

}

/* Determines whether password is valid */
function isValidPassword(password) {

  if (password.length < 8 || password.length > 32) return false;

  for (let char of password) {
    if (!isValidPasswordChar(char)) return false;
  }

  return true;

}

/* Usernames may only contain letters, numbers, and underscores */
function isValidUsernameChar(char) {
  return (isLetterChar(char) || isNumberChar(char) || char === "_");
}

/* Passwords may only contain letters, numbers, and select special characters */
function isValidPasswordChar(char) {
  const specialChars = ".!?-";
  return (isLetterChar(char) || isNumberChar(char) || specialChars.includes(char));
}

/* Returns true only for upper-case or lower-case letter inputs */
function isLetterChar(char) {
  const code = char.charCodeAt(0);
  return (65 <= code && code <= 90 || 97 <= code && code <= 122);
}

/* Returns true only for numeral digits 0-9 */
function isNumberChar(char) {
  const code = char.charCodeAt(0);
  return (48 <= code && code <= 57);
}

module.exports = {
  getDate,
  isValidEmail,
  isValidUsername,
  isValidPassword
};
