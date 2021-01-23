/* Creates post element according to JSON data */
function renderPost(data) {
  return `
    <div class="box">

      <div class="post-container">

        <div class="post-header">
          <img class="profile-picture" src="https://photography-app-content.s3.amazonaws.com/content/silhouette.svg"/>
          <h2><a href="${URL}/profile/${data.poster}">${data.poster}</a></h2>
        </div>

        <div class="image-container">
          <img class="post-image" src="https://photography-app-content.s3.amazonaws.com/${data.ref}${data.type ? "."+data.type : ""}"/>
          <div class="caption-container">
            <div class="caption">
              <h3>${data.caption}</h3>
              <h3>${renderHashtags(data.hashtags)}</h3>
            </div>
          </div>
        </div>

        <div class="post-footer">
          <div>
            <button class="icon-button"><img src="https://photography-app-content.s3.amazonaws.com/content/comment.svg"/></button>
            <h4 class="comments">13</h4>
            <button class="icon-button"><img src="https://photography-app-content.s3.amazonaws.com/content/heart.svg"/></button>
            <h4 class="hearts">${data.hearts}</h4>
          </div>
          <h4 class="location">${data.location}</h4>
        </div>

        <div id="comments-section-${data.ref}" class="comments-section">
        </div>

      </div>

    </div>
  `;
}

function renderComments(comments) {
  let string = "";
  for (let comment of comments)
    string = string + renderComment(comment);
  return string;
}

function renderComment(comment) {
  return `
    <div class="comment">
      <span><a href="/profile/${comment.poster}"><b>${comment.poster}:</b></a> ${comment.comment}</span>
    </div>
  `;
}

function renderHashtags(hashtags) {
  console.log(hashtags);
  html = hashtags.map(hashtag => `<span class="hashtag"><a href="${URL}/search/query?v=${hashtag}">#${hashtag}</a></span>`);
  html = html.join(" ");
  return html;
}

/* Renders post of reference number inside of container */
function appendPost(container, ref) {

  fetch(`${URL}/api/photo/${ref}`)
  .then(res => res.json())
  .then(data => {
    let post = renderPost(data);
    container.innerHTML = container.innerHTML + post;

    fetch(`${URL}/api/comments/${ref}`)
    .then(res => res.json())
    .then(data => {
      let comments = renderComments(data.comments);
      let container = getElement("comments-section-"+ref);
      container.innerHTML = container.innerHTML + comments;
    });

  });

}

/* Renders posts from list of reference numbers inside of container */
function appendPosts(container, refs) {
  for (let ref of refs) {
    appendPost(container, ref);
  }
}
