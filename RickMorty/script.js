const container = document.getElementById("character-container");
const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filter-btn");

let allCharacters = [];

// Load characters from API
async function loadCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  allCharacters = data.results;
  renderCharacters(allCharacters);
}

// Render character cards
function renderCharacters(characters) {
  container.innerHTML = "";

  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl overflow-hidden shadow-md p-4 text-center";

    const statusColor =
      char.status === "Alive"
        ? "text-green-600"
        : char.status === "Dead"
        ? "text-red-500"
        : "text-yellow-500";

    card.innerHTML = `
  <img src="${char.image}" alt="${char.name}" class="w-full h-56 object-cover rounded-lg mb-4" />
  <h2 class="text-xl font-bold mb-4">${char.name}</h2>
  
  <div class="space-y-1 text-left text-sm">
    <p><span class="font-bold">Status:</span> 
      <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold uppercase">
        ${char.status}
      </span>
    </p>
    <p><span class="font-bold">Species:</span> 
      <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
        ${char.species}
      </span>
    </p>
    <p><span class="font-bold">Gender:</span> ${char.gender}</p>
    <p><span class="font-bold">Origin:</span> ${char.origin.name}</p>
    <p><span class="font-bold">Location:</span> ${char.location.name}</p>
  </div>
`;

    container.appendChild(card);
  });
}

// Filter logic
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    if (filter === "all") {
      renderCharacters(allCharacters);
    } else {
      const filtered = allCharacters.filter(
        (char) =>
          char.status.toLowerCase() === filter.toLowerCase() ||
          char.species.toLowerCase() === filter.toLowerCase()
      );
      renderCharacters(filtered);
    }
  });
});

// Search logic
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allCharacters.filter((char) =>
    char.name.toLowerCase().includes(query)
  );
  renderCharacters(filtered);
});

loadCharacters();

// Active button style
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active styles from all
    filterBtns.forEach((b) => b.classList.remove("bg-red-500", "text-white"));
    // Add to current
    btn.classList.add("bg-red-500", "text-white");

    const filter = btn.dataset.filter;
    if (filter === "all") {
      renderCharacters(allCharacters);
    } else {
      const filtered = allCharacters.filter(
        (char) =>
          char.status.toLowerCase() === filter.toLowerCase() ||
          char.species.toLowerCase() === filter.toLowerCase()
      );
      renderCharacters(filtered);
    }
  });
});
