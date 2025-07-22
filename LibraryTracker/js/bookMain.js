import {
  openAddBookModal,
  closeAddBookModal,
  handleRating,
} from "./bookModals.js";
import { loadBooksFromStorage } from "./bookStorage.js";
import { renderBooks } from "./bookUI.js";
import { addBook } from "./bookData.js";
import { toggleSort, toggleFilter } from "./bookUI.js";

window.openAddBookModal = openAddBookModal;
window.closeAddBookModal = closeAddBookModal;
window.handleRating = handleRating;
window.toggleSort = toggleSort;
window.toggleFilter = toggleFilter;

document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!title || !author) return alert("Fill in title and author.");

  const reader = new FileReader();
  reader.onload = function (event) {
    const newBook = {
      title,
      author,
      image: file
        ? event.target.result
        : "https://via.placeholder.com/150x220?text=No+Image",
      isAvailable: true,
      ratings: [],
    };
    addBook(newBook);
    closeAddBookModal();
    e.target.reset();
  };

  if (file) reader.readAsDataURL(file);
  else reader.onload();
});

loadBooksFromStorage();
renderBooks();
