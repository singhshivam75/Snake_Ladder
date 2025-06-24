document.addEventListener("DOMContentLoaded", () => {
  const playerCount = localStorage.getItem("playerCount") || 2;
  const playerInputsContainer = document.getElementById("playerInputs");

  const colorOptions = ["Red", "Blue", "Green", "Yellow"];

  for (let i = 1; i <= playerCount; i++) {
    const block = document.createElement("div");
    block.className = "player-block";

    block.innerHTML = `
      <label>Player ${i} Name</label>
      <input type="text" name="name${i}" placeholder="Enter name" required />

      <label>Player ${i} Color</label>
      <select name="color${i}" class="color-select" required>
        <option value="">Choose a color</option>
        ${colorOptions.map(color => `<option value="${color.toLowerCase()}">${color}</option>`).join("")}
      </select>
    `;
    playerInputsContainer.appendChild(block);
  }

  const selects = document.querySelectorAll('.color-select');
  selects.forEach(select => {
    select.addEventListener('change', () => {
      updateColorOptions();
    });
  });

  function updateColorOptions() {
    const selected = Array.from(selects).map(s => s.value).filter(v => v);
    selects.forEach(select => {
      Array.from(select.options).forEach(option => {
        if (option.value && selected.includes(option.value) && select.value !== option.value) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    });
  }

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
    window.location.href = "index.html";
  });
});
