window.onload = () => {

  // fetch challenges information
  fetch(`${DOMAIN_NAME}/api/challenges`)
  .then(res => res.json())
  // display challenges in container
  .then(data => {
    const container = getElement("challenges");
    console.log(data);
    data.forEach(item => {
      let elem = renderChallenge(item);
      container.innerHTML = container.innerHTML + elem;
    });
  });

};
