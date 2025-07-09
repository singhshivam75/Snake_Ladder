    function goToCustomizePage(playerCount) {
      if (parseInt(playerCount) === 1) {
        // Auto-assign bot and jump to game page directly
        const players = [
          { name: "Player 1", color: "red", isBot: false },
          { name: "Bot", color: "blue", isBot: true }
        ];
        localStorage.setItem("players", JSON.stringify(players));
        window.location.href = "index.html";
      } else {
        localStorage.setItem('playWithBot', 'false');
        localStorage.setItem('playerCount', playerCount);
        window.location.href = 'player-setup.html';
      }
    }