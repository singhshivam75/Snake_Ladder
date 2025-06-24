document.addEventListener("DOMContentLoaded", () => {
  const playerCount = localStorage.getItem("playerCount") || 2;
  const playWithBot = localStorage.getItem("playWithBot") === "true";
  const playerInputsContainer = document.getElementById("playerInputs");

  const colorOptions = ["Red", "Blue", "Green", "Yellow"];
  const usedColors = new Set();

  const updateColorDropdowns = () => {
    const allSelects = document.querySelectorAll("select");
    allSelects.forEach(select => {
      const currentValue = select.value;
      select.querySelectorAll("option").forEach(option => {
        const optionValue = option.value;
        if (
          usedColors.has(optionValue) &&
          optionValue !== currentValue &&
          optionValue !== ""
        ) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    });
  };

  for (let i = 1; i <= playerCount; i++) {
    if (playWithBot && i === 2) {
      continue;
    }
    const block = document.createElement("div");
    block.className = "player-block";

    block.innerHTML = `
      <label>Player ${i} Name</label>
      <input type="text" name="name${i}" placeholder="Enter name" required />

      <label>Player ${i} Color</label>
      <select name="color${i}" required>
        <option value="">Choose a color</option>
        ${colorOptions
        .map(color => `<option value="${color.toLowerCase()}">${color}</option>`)
        .join("")}
      </select>
    `;
    playerInputsContainer.appendChild(block);
  }

  playerInputsContainer.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      usedColors.clear();
      document.querySelectorAll("select").forEach(select => {
        if (select.value) usedColors.add(select.value);
      });
      updateColorDropdowns();
    }
  });

  document.getElementById("playerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const players = [];

    for (let i = 1; i <= playerCount; i++) {
      const name = document.querySelector(`[name="name${i}"]`).value.trim();
      const color = document.querySelector(`[name="color${i}"]`).value;

      if (!name || !color) {
        alert("Please enter valid details for all players.");
        return;
      }

      players.push({ name, color, position: 1 });
    }

    localStorage.setItem("players", JSON.stringify(players));
    if (playWithBot) {
      players.push({
        name: "Bot",
        color: "blue",
        position: 1,
        isBot: true
      });
    }

    window.location.href = "index.html";
  });
});
