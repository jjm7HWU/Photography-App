window.onload = () => {

  // get photo reference number from URL
  const ref = getPageName();

  const container = getElement("post");

  // render post
  appendPost(container, ref);

};
