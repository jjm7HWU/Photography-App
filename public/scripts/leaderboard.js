function renderLeaderboardSlot(position, data) {
  return `
    <div class="box leaderboard-slot">
      <h2 class="right-text">${position}</h2>
      <img class="profile-picture" src="https://photography-app-content.s3.amazonaws.com/content/silhouette.svg"/>
      <h2><a href="${DOMAIN_NAME}/profile/${data.username}">${data.username}</a></h2>
      <h2 class="right-text">${data.points}</h2>
    </div>
  `
}

function renderLeaderboard(container, data) {
  data.forEach((entry, index) => {
    let slot = renderLeaderboardSlot(index + 1, entry);
    container.innerHTML = container.innerHTML + slot;
  });
}

window.onload = () => {

  // fetch JSON data to populate leaderboard
  fetch(`${DOMAIN_NAME}/api/leaderboard/global`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderLeaderboard(getElement("leaderboard-container"), data);
  });

};
