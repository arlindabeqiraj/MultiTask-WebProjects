import { addRating, addBook } from "./bookData.js";

let currentRatingBookTitle = null;
const ratingModal = document.getElementById("ratingModal");
const ratingSlider = document.getElementById("ratingSlider");

export function handleRating(title) {
  currentRatingBookTitle = title;
  ratingSlider.value = 3;
  ratingModal.classList.remove("hidden");
}

document.getElementById("cancelRating").addEventListener("click", () => {
  ratingModal.classList.add("hidden");
  currentRatingBookTitle = null;
});

document.getElementById("submitRating").addEventListener("click", () => {
  const rating = parseInt(ratingSlider.value);
  if (currentRatingBookTitle && !isNaN(rating)) {
    addRating(currentRatingBookTitle, rating);
  }
  ratingModal.classList.add("hidden");
  currentRatingBookTitle = null;
});

export function openAddBookModal() {
  document.getElementById("addBookModal").classList.remove("hidden");
}

export function closeAddBookModal() {
  document.getElementById("addBookModal").classList.add("hidden");
}
