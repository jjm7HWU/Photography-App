window.onload = () => {

  const username = getPageName();

  getElement("page-title").innerHTML = `Users followed by ${username}`;

  // fetch JSON data to populate following list
  fetch(`${URL}/api/following/${username}`)
  .then(res => res.json())
  .then(data => {
    createUserList(getElement("following-list"), data);
    populateUserList(data);
  });

};
