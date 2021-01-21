window.onload = () => {

  // get username from URL
  const username = getPageName();

  getElement("followers-container").href = `/followers/${username}`;
  getElement("following-container").href = `/following/${username}`;

  // fetch JSON data to populate profile header
  fetch(`${URL}/api/user/${username}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.title = `NatureApp | ${username}'s Profile`
    renderElement(getElement("profile-page-top"), data);
  });

  const posts = getElement("profile-posts");

  appendPost(posts, 3);
  appendPost(posts, 2);
  appendPost(posts, 1);

};
