function showPopup({ name, image, description }) {
  const existing = document.querySelector(".fixed.z-50");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.className =
    "fixed inset-0 bg-black/50 z-50 flex items-center justify-center";
  popup.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl border-2 border-gray-300 max-w-sm w-full p-6 relative text-center">
      <button class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">&times;</button>
      <img src="${image}" alt="${name}" class="mx-auto mb-4 h-20 object-contain" />
      <h2 class="text-xl font-bold mb-2">${name}</h2>
      <p class="text-sm text-gray-600">${description}</p>
    </div>
  `;

  document.body.appendChild(popup);
  popup.querySelector("button").addEventListener("click", () => popup.remove());
}

export async function initLogoPopup() {
  const slider = document.getElementById("companySlider");
  if (!slider) return;

  let companies = [];
  try {
    const res = await fetch("./data/companies.json");
    companies = await res.json();
  } catch (err) {
    console.error("Failed to fetch company data:", err);
    return;
  }

  slider.querySelectorAll("img").forEach((logo) => {
    const id = logo.dataset.id;
    logo.addEventListener("click", () => {
      const company = companies.find((c) => c.id === id);
      if (company) showPopup(company);
    });
  });
}
