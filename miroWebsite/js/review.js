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

function getReviews() {
  return JSON.parse(localStorage.getItem("reviews")) || [];
}

function saveReviews(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

function loadReviews() {
  const testimonialList = document.getElementById("testimonialList");
  if (!testimonialList) return;
  const reviews = getReviews();
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
    renderStars(card.querySelector("[data-rating]"))(review.rating);
  });
}

function updateAverageRating() {
  const reviews = getReviews();
  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const container =
    document.getElementById("rating-stars") ||
    document.getElementById("average-stars");

  if (container) renderStars(container)(avg);
}

export function initReviewForm() {
  const form = document.getElementById("reviewForm");
  const toggleBtn = document.getElementById("toggleFormBtn");
  const overlay = document.getElementById("formOverlay");
  const closeBtn = document.getElementById("closeFormBtn");

  if (toggleBtn)
    toggleBtn.addEventListener("click", () =>
      overlay.classList.remove("hidden")
    );
  if (closeBtn)
    closeBtn.addEventListener("click", () => overlay.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = document.getElementById("image").files[0];
      if (!file) return alert("Please upload an image!");

      const reader = new FileReader();
      reader.onloadend = function () {
        const newReview = {
          name: document.getElementById("name").value.trim(),
          company: document.getElementById("company").value.trim(),
          comment: document.getElementById("comment").value.trim(),
          rating: parseFloat(document.getElementById("rating").value),
          image: reader.result,
        };

        if (
          newReview.name.length < 2 ||
          newReview.company.length < 2 ||
          newReview.comment.length < 6 ||
          newReview.rating < 1 ||
          newReview.rating > 5
        ) {
          alert("Please fill out the form correctly.");
          return;
        }

        const reviews = getReviews();
        reviews.push(newReview);
        saveReviews(reviews);

        form.reset();
        overlay.classList.add("hidden");
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
}
