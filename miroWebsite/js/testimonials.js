export function initTestimonialSort() {
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
}
