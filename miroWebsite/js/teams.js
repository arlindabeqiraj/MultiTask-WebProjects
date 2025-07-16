let teamData = [];

function renderTeamTab(key) {
  const content = document.getElementById("team-content");
  const data = teamData.find((item) => item.id === key);
  if (!data || !content) return;

  const checklistItems = data.checklist
    .map(
      (item) => `
      <li class="relative pl-6 text-[16px] text-[#5f5f72] before:content-['✔'] before:absolute before:left-0 before:text-[#4262ff]">
        ${item}
      </li>`
    )
    .join("");

  content.innerHTML = `
    <div class="flex-1 min-w-[280px] animate-fade-in">
      <ul class="space-y-3 mb-6">${checklistItems}</ul>
      <a href="#" class="text-[#4262ff] text-sm font-medium hover:underline">Learn more →</a>

      ${
        data.tools
          ? `<div class="mt-6 text-sm text-gray-600">
              <span class="block mb-2">Integrate your favorite tools</span>
              <img src="img/tools.png" alt="Tool Logos" class="max-w-[160px]" />
            </div>`
          : ""
      }
    </div>

    <div class="flex-1 min-w-[300px] flex justify-center animate-fade-in">
      <div class="w-[600px] h-[360px] overflow-hidden  shadow-xl bg-white transform transition duration-300 hover:scale-[1.02]">
        <img
          src="${data.image}"
          alt="${data.title}"
          class="w-full h-full object-cover transition duration-300 ease-in-out"
        />
      </div>
    </div>
  `;
}

export function initTeamTabs() {
  fetch("./data/teams.json")
    .then((res) => res.json())
    .then((data) => {
      teamData = data;

      const buttons = document.querySelectorAll(".team-btn");
      if (!buttons.length) return;

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) =>
            b.classList.replace("bg-[#eef1ff]", "bg-gray-100")
          );
          buttons.forEach((b) =>
            b.classList.replace("text-[#4262ff]", "text-black")
          );

          btn.classList.replace("bg-gray-100", "bg-[#eef1ff]");
          btn.classList.replace("text-black", "text-[#4262ff]");

          renderTeamTab(btn.dataset.key);
        });
      });

      renderTeamTab("ux");
    })
    .catch((err) => console.error("Failed to load team data:", err));
}
