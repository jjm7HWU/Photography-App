window.onload = () => {

  // get photo reference number from URL
  const ref = getPageName();

  const container = getElement("post");

  // render post
  appendPost(container, ref);

  let comment = {
    poster: "Mitch55",
    comment: "Nice!",
    date: ""
  };

  postMethodFetch(comment, "/interact/comment", res => {
    console.log(res);
  });

}
