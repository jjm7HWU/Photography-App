function renderEmptyUserListItem(item) {
  return `
    <div id="user-${item}" class="box">
      <a href="/profile/${item}"><h1 id="username">Username</h1></a>
      <h2>Level <span id="rank"></span></h2>
    </div>
  `;
}

function createUserList(container, data) {
  data.forEach(entry => {
    let item = renderEmptyUserListItem(entry);
    container.innerHTML = container.innerHTML + item;
  });
}

function populateUserList(list) {

  for (let username of list) {
    fetch(`${DOMAIN_NAME}/api/user/${username}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let e = getElement(`user-${username}`);
      console.log(e);
      renderElement(getElement(`user-${username}`), data);
    });
  }

}
