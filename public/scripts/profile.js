window.onload = () => {

  // get username from URL
  const username = getPageName();

  // configure hyperlinks to follower and following pages
  getElement("followers-container").href = `/followers/${username}`;
  getElement("following-container").href = `/following/${username}`;

  // fetch JSON data to populate profile header
  fetch(`${DOMAIN_NAME}/api/user/${username}`)
  .then(res => res.json())
  // populate profile header
  .then(data => {
    document.title = `NatureApp | ${username}'s Profile`
    renderElement(getElement("profile-page-top"), data);
  });

  // fetch user activity to show on profile
  fetch(`${DOMAIN_NAME}/api/activity/${username}`)
  .then(res => res.json())
  // display activity content in container
  .then(data => {
    const container = getElement("profile-posts");
    data.activity.forEach(item => appendPost(container, item.ref))
  });

};
