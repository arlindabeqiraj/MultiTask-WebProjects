let workData = [];

function renderTab(key) {
  const c = document.getElementById("tab-content");
  const item = workData.find((item) => item.id === key);
  if (!c || !item) return;

  const { title, text, image } = item;
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
  fetch("./data/work.json")
    .then((res) => res.json())
    .then((data) => {
      workData = data;

      const tabs = document.querySelectorAll(".tab-btn");
      if (!tabs.length) return;

      tabs.forEach((btn) => {
        btn.addEventListener("click", () => {
          tabs.forEach((b) =>
            b.classList.remove("bg-[#eef1ff]", "text-[#4262ff]")
          );
          tabs.forEach((b) => b.classList.add("bg-gray-100", "text-black"));
          btn.classList.add("bg-[#eef1ff]", "text-[#4262ff]");
          btn.classList.remove("bg-gray-100", "text-black");

          renderTab(btn.dataset.key);
        });
      });

      renderTab("brainstorming");
    })
    .catch((err) => console.error("Failed to load work.json:", err));
}
