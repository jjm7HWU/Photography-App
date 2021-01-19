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
          <img class="post-image" src="https://photography-app-content.s3.amazonaws.com/${data.ref}.${data.type}"/>
          <div class="caption-container">
            <h3 class="caption">${data.caption}</h3>
          </div>
        </div>

        <div class="post-footer">
          <div>
            <img src="https://photography-app-content.s3.amazonaws.com/content/comment.svg" style="width: 2rem; height: 2rem;"/>
            <img src="https://photography-app-content.s3.amazonaws.com/content/heart.svg" style="width: 2rem; height: 2rem;"/>
            <h4 class="hearts">${data.hearts}</h4>
          </div>
          <h4 class="location">${data.location}</h4>
        </div>

        <div class="comments">
          <h3>No comments yet</h3>
        </div>

      </div>

    </div>
  `;
}

/* Renders post of reference number inside of container */
function appendPost(container, ref) {

  fetch(`${URL}/api/photo/${ref}`)
  .then(res => res.json())
  .then(data => {
    let post = renderPost(data);
    container.innerHTML = container.innerHTML + post;
  });

}
