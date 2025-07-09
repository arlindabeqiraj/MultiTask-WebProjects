// ---  Toast popup ---
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `
    px-5 py-3 rounded-md text-white font-medium shadow-lg transition-all duration-300
    ${type === "success" ? "bg-green-500" : "bg-red-500"}
  `;
  toast.textContent = message;

  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 4000);
}

// --- Loading Spinner ---
function showLoading(button, duration = 2000, callback) {
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<span class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>Loading...`;

  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = originalText;
    callback();
  }, duration);
}

// --- Sign up flow ---
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("input[type='email']");
  const signUpBtn =
    document.querySelector("button[type='submit']") ||
    document.querySelector("button");

  if (emailInput && signUpBtn) {
    signUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      showLoading(signUpBtn, 2500, () => {
        if (isValidEmail(email)) {
          showToast("Registration successful!", "success");
        } else {
          showToast("Invalid email address.", "error");
        }
      });
    });
  }
});

// --- Company logos slider ---
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("companySlider");
  const gap = 40;
  const visibleSlides = 6;
  let currentIndex = 0;

  const logos = Array.from(track.children);
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });

  const getSlideWidth = () => {
    const logo = track.querySelector("img");
    const logoWidth = logo.getBoundingClientRect().width;
    return logoWidth + gap;
  };

  const updateSlider = (instant = false) => {
    const slideWidth = getSlideWidth();
    const translateX = -(slideWidth * currentIndex);
    track.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${translateX}px)`;
  };

  const slideRight = () => {
    const total = track.children.length;
    const half = total / 2;

    currentIndex++;
    updateSlider();

    if (currentIndex >= half) {
      setTimeout(() => {
        currentIndex = 0;
        updateSlider(true);
      }, 500);
    }
  };

  setInterval(slideRight, 3000);
});

// ---  Logo click popup ---
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

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("companySlider");
  const logos = slider.querySelectorAll("img");

  logos.forEach((logo) => {
    const logoId = logo.dataset.id;
    logo.addEventListener("click", () => {
      const company = companyData.find((c) => c.id === logoId);
      if (company) showPopup(company);
    });
  });
});

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

  popup.querySelector("button").addEventListener("click", () => {
    popup.remove();
  });
}
