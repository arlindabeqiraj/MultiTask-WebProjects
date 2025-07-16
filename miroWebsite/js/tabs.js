const data = {
  brainstorming: {
    title: "Brainstorming",
    text: "Unleash your team’s creativity with sticky notes, mind maps, and endless canvas space. Turn raw ideas into actionable concepts that move your project forward.",
    image: "img/brainstorm.png",
  },
  diagramming: {
    title: "Diagramming",
    text: "Quickly visualize workflows, systems, or processes using intuitive shapes and connectors. Collaborate live as your team builds logic, architecture, and data flows together.",
    image: "img/diagram.png",
  },
  meetings: {
    title: "Meetings & Workshops",
    text: "Run productive sessions that everyone wants to join. Use ready-made templates, timer tools, and voting features to keep things engaging and on track.",
    image: "img/meeting.png",
  },
  scrum: {
    title: "Scrum Events",
    text: "Plan sprints, lead daily standups, and manage retrospectives all in one space. Visual tools help your Agile team stay in sync and focused.",
    image: "img/scrum.png",
  },
  mapping: {
    title: "Mapping",
    text: "Create journey maps, process maps, or service blueprints to gain clarity and alignment across departments. Highlight gaps, patterns, and opportunities.",
    image: "img/mapping.png",
  },
  research: {
    title: "Research & Design",
    text: "Gather insights, organize findings, and co-design solutions. Centralize user feedback, personas, and wireframes to fuel better product decisions.",
    image: "img/research.png",
  },
  planning: {
    title: "Strategic Planning",
    text: "Connect the big picture to day-to-day execution. Define vision, set goals, and map out plans visually so everyone understands the why behind the what.",
    image: "img/planning.png",
  },
};
function renderTab(key) {
  const c = document.getElementById("tab-content");
  if (!c || !data[key]) return;

  const { title, text, image } = data[key];
  c.innerHTML = `
    <div class="flex-1 min-w-[280px] animate-fade-in">
      <p class="text-lg font-semibold text-[#050038] mb-4">${title}</p>
      <p class="text-base text-[#5f5f72] mb-4">${text}</p>
      <a href="#" class="text-[#4262ff] text-sm font-medium">Learn more →</a>
    </div>

    <div class="flex-1 min-w-[300px] flex justify-center animate-fade-in">
      <div
         class="w-[600px] h-[360px] overflow-hidden  shadow-xl bg-white transform transition duration-300 hover:scale-[1.02]"
      >

        <img
          src="${image}"
          alt="${title}"
          class="w-full h-full object-cover transition duration-300 ease-in-out"
        />
      </div>
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
