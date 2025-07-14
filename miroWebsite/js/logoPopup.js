const companyData = [
  {
    id: "1",
    name: "Walmart",
    description:
      "Walmart is a globally recognized company known for excellence in its industry.",
    image: "img/logo1.png",
  },
  {
    id: "2",
    name: "Cisco",
    description:
      "Cisco is a globally recognized company known for excellence in its industry.",
    image: "img/logo2.png",
  },
  {
    id: "3",
    name: "Volvo",
    description:
      "Volvo is a globally recognized company known for excellence in its industry.",
    image: "img/logo3.png",
  },
  {
    id: "4",
    name: "Deloitte",
    description:
      "Deloitte is a globally recognized company known for excellence in its industry.",
    image: "img/logo4.png",
  },
  {
    id: "5",
    name: "Okta",
    description:
      "Okta is a globally recognized company known for excellence in its industry.",
    image: "img/logo5.png",
  },
  {
    id: "6",
    name: "Sanofi",
    description:
      "Sanofi is a globally recognized company known for excellence in its industry.",
    image: "img/logo6.png",
  },
  {
    id: "7",
    name: "Starbucks",
    description:
      "Starbucks is a globally recognized company known for excellence in its industry.",
    image: "img/logo7.png",
  },
  {
    id: "8",
    name: "ConocoPhillips",
    description:
      "ConocoPhillips is a globally recognized company known for excellence in its industry.",
    image: "img/logo8.png",
  },
  {
    id: "9",
    name: "Visa",
    description:
      "Visa is a globally recognized company known for excellence in its industry.",
    image: "img/logo9.png",
  },
  {
    id: "10",
    name: "JPMorganChase",
    description:
      "JPMorganChase is a globally recognized company known for excellence in its industry.",
    image: "img/logo10.png",
  },
  {
    id: "11",
    name: "Broadcom",
    description:
      "Broadcom is a globally recognized company known for excellence in its industry.",
    image: "img/logo11.png",
  },
  {
    id: "12",
    name: "Loreal",
    description:
      "Loreal is a globally recognized company known for excellence in its industry.",
    image: "img/logo12.png",
  },
  {
    id: "13",
    name: "Hermes",
    description:
      "Hermes is a globally recognized company known for excellence in its industry.",
    image: "img/logo13.png",
  },
  {
    id: "14",
    name: "Intel",
    description:
      "Intel is a globally recognized company known for excellence in its industry.",
    image: "img/logo14.png",
  },
  {
    id: "5",
    name: "ABInBev",
    description:
      "ABInBev is a globally recognized company known for excellence in its industry.",
    image: "img/logo15.png",
  },
  {
    id: "16",
    name: "Accenture",
    description:
      "Accenture is a globally recognized company known for excellence in its industry.",
    image: "img/logo16.png",
  },
  {
    id: "17",
    name: "Comcast",
    description:
      "Comcast is a globally recognized company known for excellence in its industry.",
    image: "img/logo17.png",
  },
  {
    id: "18",
    name: "AMD",
    description:
      "AMD is a globally recognized company known for excellence in its industry.",
    image: "img/logo18.png",
  },
  {
    id: "19",
    name: "Netflix",
    description:
      "Netflix is a globally recognized company known for excellence in its industry.",
    image: "img/logo19.png",
  },
  {
    id: "20",
    name: "Siemens",
    description:
      "Siemens is a globally recognized company known for excellence in its industry.",
    image: "img/logo20.png",
  },
];

function showPopup(company) {
  const existing = document.querySelector(".fixed.z-50");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.className =
    "fixed inset-0 bg-black/50 z-50 flex items-center justify-center";
  popup.innerHTML = `
    <div class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative text-center">
      <button class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">&times;</button>
      <img src="${company.image}" alt="${company.name}" class="mx-auto mb-4 h-20 object-contain" />
      <h2 class="text-xl font-bold mb-2">${company.name}</h2>
      <p class="text-sm text-gray-600">${company.description}</p>
    </div>
  `;

  document.body.appendChild(popup);
  popup.querySelector("button").addEventListener("click", () => popup.remove());
}

export function initLogoPopup() {
  const slider = document.getElementById("companySlider");
  if (!slider) return;

  slider.querySelectorAll("img").forEach((logo) => {
    const id = logo.dataset.id;
    logo.addEventListener("click", () => {
      const company = companyData.find((c) => c.id === id);
      if (company) showPopup(company);
    });
  });
}
