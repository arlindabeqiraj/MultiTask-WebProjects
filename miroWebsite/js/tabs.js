const data = {
  brainstorming: {
    title: "Brainstorming",
    text: "Unleash creative ideas...",
    image: "img/brainstorm.png",
  },
  diagramming: {
    title: "Diagramming",
    text: "Visualize complex processes...",
    image: "img/diagram.png",
  },
  meetings: {
    title: "Meetings & Workshops",
    text: "Run engaging meetings...",
    image: "img/meeting.png",
  },
  scrum: {
    title: "Scrum Events",
    text: "Plan sprints, daily standups...",
    image: "img/scrum.png",
  },
  mapping: {
    title: "Mapping",
    text: "Map out journeys...",
    image: "img/mapping.png",
  },
  research: {
    title: "Research & Design",
    text: "Collect insights...",
    image: "img/research.png",
  },
  planning: {
    title: "Strategic Planning",
    text: "Align teams and goals...",
    image: "img/planning.png",
  },
};

function renderTab(key) {
  const content = document.getElementById("tab-content");
  if (!content || !data[key]) return;

  const { title, text, image } = data[key];
  content.innerHTML = `
    <div class="flex-1 min-w-[280px]">
      <p class="text-lg font-semibold text-[#050038] mb-4">${title}</p>
      <p class="text-base text-[#5f5f72] mb-4">${text}</p>
      <a href="#" class="text-[#4262ff] text-sm font-medium">Learn more →</a>
    </div>
    <div class="flex-1 min-w-[300px] text-center">
      <img src="${image}" alt="${title}" class="w-[500px] h-auto mx-auto rounded-xl shadow-sm" />
    </div>
  `;
}

export function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  if (!tabs.length) return;

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("bg-[#eef1ff]", "text-[#4262ff]"));
      tabs.forEach((b) => b.classList.add("bg-gray-100", "text-black"));
      btn.classList.add("bg-[#eef1ff]", "text-[#4262ff]");
      btn.classList.remove("bg-gray-100", "text-black");

      renderTab(btn.dataset.key);
    });
  });

  renderTab("brainstorming");
}
