// --- Exercise 1: Toast popup ---
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 4000);
}

// --- Exercise 2: Loading Spinner ---
function showLoading(button, duration = 3000, callback = null) {
  const originalText = button.innerHTML;
  button.innerHTML = `<span class="spinner"></span>`;
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;

    if (typeof callback === "function") {
      callback();
    }
  }, duration);
}

// --- Exercise 3: Sign up flow ---
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector(".email-form input");
  const signUpBtn = document.querySelector(".email-form button");

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

// Exercise 4: Company logos slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("companySlider");
  const gap = 60;
  const slideInterval = 3000;
  let currentIndex = 0;

  const originalLogos = Array.from(track.children);
  originalLogos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });

  function getSlideWidth() {
    const logo = track.querySelector("img");
    return logo ? logo.offsetWidth + gap : 210;
  }

  function updateSlider(instant = false) {
    const slideWidth = getSlideWidth();
    const translateX = -(slideWidth * currentIndex);

    if (instant) {
      track.style.transition = "none";
    } else {
      track.style.transition = "transform 0.5s ease-in-out";
    }

    track.style.transform = `translateX(${translateX}px)`;
  }

  function slideRight() {
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
  }

  setInterval(slideRight, slideInterval);
});

// Exercise 5
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
    name: "FedEX",
    description:
      "FedEx is a global logistics and delivery services company, known for its speed, reliability, and innovative shipping solutions.",
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
  const existing = document.querySelector(".company-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.className = "company-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close-btn">&times;</span>
      <img src="${company.image}" alt="${company.name}" />
      <h2>${company.name}</h2>
      <p>${company.description}</p>
    </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector(".close-btn").addEventListener("click", () => {
    popup.remove();
  });
}

// Exercise 6
document.addEventListener("DOMContentLoaded", () => {
  const sortBtn = document.getElementById("sortTestimonialsBtn");
  const wrapper = document.getElementById("testimonialWrapper");

  const originalCards = Array.from(
    wrapper.querySelectorAll(".testimonial-card")
  );
  let isSorted = false;

  sortBtn.addEventListener("click", () => {
    wrapper.innerHTML = "";

    if (!isSorted) {
      const sorted = [...originalCards].sort((a, b) =>
        a.dataset.name.toLowerCase().localeCompare(b.dataset.name.toLowerCase())
      );
      sorted.forEach((card) => wrapper.appendChild(card));
      sortBtn.textContent = "Sort by Company Name";
    } else {
      originalCards.forEach((card) => wrapper.appendChild(card));
      sortBtn.textContent = "Sort by Company Name";
    }

    isSorted = !isSorted;
  });
});
