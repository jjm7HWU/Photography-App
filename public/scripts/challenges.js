function renderChallenge(data) {
  return `
    <div class="challenge" style="background: url(${BUCKET_ADDRESS}/challenges/${data.id}.jpg);">
      <h1>${data.name}</h1>
      <h2>${data.description}</h2>
      <h3>Reward: ${data.reward} points</h3>
    </div>
  `;
}

function renderChallenges(items) {
  let output = "";
  items.forEach(item => output = output + renderChallenge(item));
  return output;
}
