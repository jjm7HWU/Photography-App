window.onload = () => {

  // get username from URL
  const username = getPageName();

  // fetch JSON data to populate profile header
  fetch(`${URL}/api/user/${username}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderElement(getElement("profile-page-top"), data);
  });

  const posts = getElement("profile-posts");

  appendPost(posts, 3);
  appendPost(posts, 2);
  appendPost(posts, 1);

}
