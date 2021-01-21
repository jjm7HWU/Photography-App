window.onload = () => {

  // get photo reference number from URL
  const ref = getPageName();

  const container = getElement("post");

  // render post
  appendPost(container, ref);

  let interaction = {
    sourceUser: "Alfonso",
    action: "follow",
    username: "Mitch55"
  };

  postMethodFetch(interaction, "/interact", res => {
    console.log(res);
  });

};
