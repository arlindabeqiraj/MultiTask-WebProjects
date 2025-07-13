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
  const allSignupEls = Array.from(
    document.querySelectorAll("button, a")
  ).filter((el) =>
    el.textContent.trim().toLowerCase().includes("sign up free")
  );

  allSignupEls.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      const container = el.closest("div");
      const emailInput = container
        ? container.querySelector("input[type='email']")
        : null;
      const email = emailInput ? emailInput.value.trim() : null;

      showLoading(el, 2000, () => {
        if (!emailInput) {
          showToast("Redirecting...", "success");
          return;
        }

        if (isValidEmail(email)) {
          showToast("Registration successful!", "success");
        } else {
          showToast("Invalid email address.", "error");
        }
      });
    });
  });
});

// --- Company logos slider ---
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("companySlider");
  const gap = 40;
  const visibleSlides = 6;
  let currentIndex = 0;

  
  const logoSources = Array.from(
    { length: 20 },
    (_, i) => `img/logo${i + 1}.png`
  );

  
  logoSources.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.id = index + 1;
    img.className =
      "w-[140px] h-[80px] object-contain flex-shrink-0 opacity-95";
    track.appendChild(img);
  });

 
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

// --- Sort testimonials ---
document.addEventListener("DOMContentLoaded", () => {
  const sortBtn = document.getElementById("sortTestimonialsBtn");
  const wrapper = document.getElementById("testimonialWrapper");
  if (!sortBtn || !wrapper) return;

  const originalCards = Array.from(wrapper.querySelectorAll("[data-name]"));
  let isSorted = false;

  sortBtn.addEventListener("click", () => {
    wrapper.innerHTML = "";

    if (!isSorted) {
      const sorted = [...originalCards].sort((a, b) =>
        a.dataset.name.toLowerCase().localeCompare(b.dataset.name.toLowerCase())
      );
      sorted.forEach((card) => wrapper.appendChild(card));
    } else {
      originalCards.forEach((card) => wrapper.appendChild(card));
    }

    isSorted = !isSorted;
  });
});

// --- Review ---

function isValidReview(review) {
  return (
    review.name.length > 1 &&
    review.company.length > 1 &&
    review.comment.length > 5 &&
    review.rating >= 1 &&
    review.rating <= 5
  );
}

function renderStars(container) {
  return function (rating) {
    container.innerHTML = "";
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const total = 5;

    const star = (color) => {
      const el = document.createElement("span");
      el.textContent = "★";
      el.style.color = color;
      return el;
    };

    [...Array(full)].forEach(() => container.appendChild(star("#FFA534")));
    if (hasHalf) container.appendChild(star("#FFD699"));
    [...Array(total - full - (hasHalf ? 1 : 0))].forEach(() =>
      container.appendChild(star("#d1d1d1"))
    );
  };
}

function loadReviews() {
  const testimonialList = document.getElementById("testimonialList");
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  if (!testimonialList) return;

  testimonialList.innerHTML = "";

  reviews.forEach((review) => {
    const card = document.createElement("div");
    card.className =
      "w-[300px] h-[350px] bg-white rounded-lg shadow-md p-6 flex flex-col justify-between";

    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${review.company}</h3>
      <p class="text-gray-700 text-sm mb-2">"${review.comment}"</p>
      <div class="flex gap-1 text-xl mb-3" data-rating></div>
      <div class="flex items-center gap-3">
        <img src="${review.image}" alt="${review.name}" class="w-10 h-10 rounded-full object-cover" />
        <div>
          <p class="font-semibold text-sm">${review.name}</p>
        </div>
      </div>
    `;

    testimonialList.appendChild(card);
    const ratingContainer = card.querySelector("[data-rating]");
    renderStars(ratingContainer)(review.rating);
  });
}

function updateAverageRating() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const container =
    document.getElementById("rating-stars") ||
    document.getElementById("average-stars");

  if (!container) return;

  renderStars(container)(avg);
}

document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("reviewForm");
  const toggleFormBtn = document.getElementById("toggleFormBtn");
  const formOverlay = document.getElementById("formOverlay");
  const closeFormBtn = document.getElementById("closeFormBtn");

  if (toggleFormBtn)
    toggleFormBtn.addEventListener("click", () =>
      formOverlay.classList.remove("hidden")
    );

  if (closeFormBtn)
    closeFormBtn.addEventListener("click", () =>
      formOverlay.classList.add("hidden")
    );

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fileInput = document.getElementById("image");
      const file = fileInput.files[0];
      if (!file) return alert("Please upload an image!");

      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Image = reader.result;

        const newReview = {
          name: document.getElementById("name").value.trim(),
          company: document.getElementById("company").value.trim(),
          comment: document.getElementById("comment").value.trim(),
          rating: parseFloat(document.getElementById("rating").value),
          image: base64Image,
        };

        if (!isValidReview(newReview)) {
          alert("Please fill out the form correctly.");
          return;
        }

        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        reviewForm.reset();
        formOverlay.classList.add("hidden");
        loadReviews();
        updateAverageRating();
      };

      reader.readAsDataURL(file);
    });
  }

  loadReviews();
  updateAverageRating();

  document.querySelectorAll("[data-static-rating]").forEach((el) => {
    const rating = parseFloat(el.getAttribute("data-static-rating"));
    renderStars(el)(rating);
  });
});

// slider per work together
const workImages = ["img/sl1.png", "img/sl2.png", "img/sl3.png"];

const slider = document.getElementById("workSlider");

let index = 0;

const renderImages = () => {
  slider.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const imgIndex = (index + i) % workImages.length;
    const img = document.createElement("img");
    img.src = workImages[imgIndex];
    img.className =
      "rounded-[20px] object-cover transition-all duration-500 " +
      (i === 1 ? "w-52 h-80 shadow-lg" : "w-48 h-72 opacity-80");
    slider.appendChild(img);
  }
};

renderImages();

setInterval(() => {
  index = (index + 1) % workImages.length;
  renderImages();
}, 3000);

// built for the way you work
const tabs = document.querySelectorAll(".tab-btn");
const content = document.getElementById("tab-content");

const data = {
  brainstorming: {
    title: "Brainstorming",
    text: "Unleash creative ideas and build on them with the help of sticky notes, images, mind maps, videos, drawing capabilities — the list goes on.",
    image: "img/brainstorm.png",
  },
  diagramming: {
    title: "Diagramming",
    text: "Visualize complex processes and systems with flowcharts, diagrams, and architecture maps.",
    image: "img/diagram.png",
  },
  meetings: {
    title: "Meetings & Workshops",
    text: "Run engaging meetings and interactive workshops with built-in facilitation tools.",
    image: "img/meeting.png",
  },
  scrum: {
    title: "Scrum Events",
    text: "Plan sprints, daily standups, and retrospectives visually and collaboratively.",
    image: "img/scrum.png",
  },
  mapping: {
    title: "Mapping",
    text: "Map out journeys, systems, or user flows to understand and optimize better.",
    image: "img/mapping.png",
  },
  research: {
    title: "Research & Design",
    text: "Collect insights, create personas, and build design systems — all in one space.",
    image: "img/research.png",
  },
  planning: {
    title: "Strategic Planning",
    text: "Align teams and goals using timelines, roadmaps, and strategic frameworks.",
    image: "img/planning.png",
  },
};

function renderTab(key) {
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

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => {
      b.classList.remove("bg-[#eef1ff]", "text-[#4262ff]");
      b.classList.add("bg-gray-100", "text-black");
    });
    btn.classList.remove("bg-gray-100", "text-black");
    btn.classList.add("bg-[#eef1ff]", "text-[#4262ff]");
    renderTab(btn.dataset.key);
  });
});

// Default
renderTab("brainstorming");
