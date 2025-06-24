function goToCustomizePage() {
  const playerCount = document.querySelector('input[name="playerCount"]:checked').value;

  if (parseInt(playerCount) === 1) {
    const playWithBot = confirm("You selected only 1 player. Do you want to play with a bot?");
    if (playWithBot) {
      localStorage.setItem('playWithBot', 'true');
      localStorage.setItem('playerCount', '2'); // Force to 2 for setup
    } else {
      alert("At least 2 players are required to start the game.");
      return;
    }
  } else {
    localStorage.setItem('playWithBot', 'false');
    localStorage.setItem('playerCount', playerCount);
  }

  window.location.href = 'player-setup.html';
}
