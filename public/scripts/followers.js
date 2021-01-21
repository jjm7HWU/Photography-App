window.onload = () => {

  const username = getPageName();

  getElement("page-title").innerHTML = `${username}'s Followers`;

  // fetch JSON data to populate followers list
  fetch(`${URL}/api/followers/${username}`)
  .then(res => res.json())
  .then(data => {
    createUserList(getElement("follower-list"), data);
    populateUserList(data);
  });

};
