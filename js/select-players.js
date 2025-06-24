function goToCustomizePage() {
  const playerCount = document.querySelector('input[name="playerCount"]:checked').value;

  if (parseInt(playerCount) === 1) {
    const withBot = confirm("You selected 1 player. Do you want to play with the bot?");
    if (withBot) {
      localStorage.setItem("playWithBot", "true");
      localStorage.setItem("playerCount", "2"); // force setup for 2
    } else {
      alert("Please select at least 2 players to continue.");
      return;
    }
  } else {
    localStorage.setItem("playWithBot", "false");
    localStorage.setItem("playerCount", playerCount);
  }

  window.location.href = "player-setup.html";
}
