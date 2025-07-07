const books = [];
let isFiltered = false;
let isSorted = false;
let currentRatingBookTitle = null;

const ratingModal = document.getElementById("ratingModal");
const ratingSlider = document.getElementById("ratingSlider");
const cancelRating = document.getElementById("cancelRating");
const submitRating = document.getElementById("submitRating");

// ADD BOOK
function addBook(book) {
  books.push(book);
  saveBooksToStorage();
  renderBooks();
}

// REMOVE BOOK
function removeBook(title) {
  const index = books.findIndex((b) => b.title === title);
  if (index !== -1) {
    books.splice(index, 1);
    saveBooksToStorage();
    renderBooks();
  }
}

// TOGGLE AVAILABILITY
function toggleAvailability(title) {
  const book = books.find((b) => b.title === title);
  if (book) {
    book.isAvailable = !book.isAvailable;
    saveBooksToStorage();
    renderBooks();
  }
}

// ADD RATING
function addRating(title, rating) {
  const book = books.find((b) => b.title === title);
  if (book && rating >= 1 && rating <= 5) {
    book.ratings.push(rating);
    saveBooksToStorage();
    renderBooks();
  }
}

// AVERAGE RATING
function getAverageRating(title) {
  const book = books.find((b) => b.title === title);
  if (book && book.ratings.length > 0) {
    const sum = book.ratings.reduce((a, b) => a + b, 0);
    return (sum / book.ratings.length).toFixed(1);
  }
  return "No ratings";
}

// SHOW SUMMARY
function showSummary() {
  const total = books.length;
  const available = getAvailableBooks().length;
  const ratedBooks = books.filter((b) => b.ratings.length > 0);

  let topBook = "-";
  if (ratedBooks.length > 0) {
    topBook = ratedBooks.reduce((prev, curr) =>
      getAverageRating(curr.title) > getAverageRating(prev.title) ? curr : prev
    ).title;
  }

  document.getElementById("totalBooks").textContent = total;
  document.getElementById("availableBooks").textContent = available;
  document.getElementById("topRatedBook").textContent = topBook;
}

// RENDER BOOKS
function renderBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  let displayBooks = [...books];

  if (isFiltered) {
    displayBooks = displayBooks.filter((b) => b.isAvailable);
  }

  if (isSorted) {
    displayBooks.sort((a, b) => {
      const avgA = parseFloat(getAverageRating(a.title)) || 0;
      const avgB = parseFloat(getAverageRating(b.title)) || 0;
      return avgB - avgA;
    });
  }

  displayBooks.forEach((book) => {
    const avgRatingValue = getAverageRating(book.title);
    const avgRating = isNaN(parseFloat(avgRatingValue))
      ? 0
      : parseFloat(avgRatingValue);
    const starCount = Math.round(avgRating);

    const starsHTML = Array.from({ length: 5 })
      .map((_, i) => {
        return i < starCount
          ? '<i class="fas fa-star text-yellow-400 text-sm"></i>'
          : '<i class="far fa-star text-gray-300 text-sm"></i>';
      })
      .join("");

    const div = document.createElement("div");
    div.className =
      "bg-white border-2 border-yellow-300 rounded-xl shadow-md p-4 flex flex-col justify-start items-center w-full";

    div.innerHTML = `
      <div class="w-full flex flex-col items-center">
        <img src="${book.image}" alt="${
      book.title
    }" class="h-64 w-full object-cover rounded mb-3" />
        <div class="w-full text-left mb-2">
          <p class="text-sm font-semibold">${book.title}</p>
          <p class="text-xs text-gray-600">${book.author}</p>
          <p class="text-xs ${
            book.isAvailable ? "text-green-600" : "text-red-500"
          } font-medium">
            ${book.isAvailable ? "Available" : "Unavailable"}
          </p>
        </div>
        <div class="flex gap-1 mb-3 justify-start w-full">
          ${starsHTML}
        </div>
        <div class="grid grid-cols-3 gap-2 w-full text-xs">
          <button onclick="toggleAvailability('${
            book.title
          }')" class="bg-green-300 px-2 py-1 rounded text-center">Toggle</button>
          <button onclick="handleRating('${
            book.title
          }')" class="bg-lime-200 px-2 py-1 rounded text-center">Add Rating</button>
          <button onclick="removeBook('${
            book.title
          }')" class="bg-red-200 px-2 py-1 rounded text-center">Remove</button>
        </div>
      </div>
    `;

    bookList.appendChild(div);
  });

  showSummary();
}

// HANDLE RATING MODAL
function handleRating(title) {
  if (!title) return;
  currentRatingBookTitle = title;
  ratingSlider.value = 3;
  ratingModal.classList.remove("hidden");
}

// FORM SUBMISSION
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!title || !author) {
    alert("Please fill in both title and author.");
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const newBook = {
        title,
        author,
        image: event.target.result,
        isAvailable: true,
        ratings: [],
      };
      addBook(newBook);
      closeAddBookModal();
      e.target.reset();
    };
    reader.readAsDataURL(file);
  } else {
    const newBook = {
      title,
      author,
      image: "https://via.placeholder.com/150x220?text=No+Image",
      isAvailable: true,
      ratings: [],
    };
    addBook(newBook);
    closeAddBookModal();
    e.target.reset();
  }
});

// RATING MODAL EVENTS
cancelRating.addEventListener("click", () => {
  ratingModal.classList.add("hidden");
  currentRatingBookTitle = null;
});

submitRating.addEventListener("click", () => {
  const rating = parseInt(ratingSlider.value);
  if (currentRatingBookTitle && !isNaN(rating)) {
    addRating(currentRatingBookTitle, rating);
  }
  ratingModal.classList.add("hidden");
  currentRatingBookTitle = null;
});

// TOGGLE SORT
function toggleSort() {
  isSorted = !isSorted;
  const sortBtn = document.getElementById("sortBtn");
  sortBtn.textContent = isSorted ? "reset sort" : "sort by rating";
  renderBooks();
}

// TOGGLE FILTER
function toggleFilter() {
  isFiltered = !isFiltered;
  const filterBtn = document.getElementById("filterBtn");
  filterBtn.textContent = isFiltered ? "reset filter" : "show available only";
  renderBooks();
}

// MODALS
function openAddBookModal() {
  document.getElementById("addBookModal").classList.remove("hidden");
}

function closeAddBookModal() {
  document.getElementById("addBookModal").classList.add("hidden");
}

// STORAGE
function saveBooksToStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooksFromStorage() {
  const data = localStorage.getItem("books");
  books.length = 0; // Reset array
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        parsed.forEach((b) => {
          books.push({
            title: b.title ?? "Unknown",
            author: b.author ?? "Unknown",
            image:
              b.image ?? "https://via.placeholder.com/150x220?text=No+Image",
            isAvailable:
              typeof b.isAvailable === "boolean" ? b.isAvailable : true,
            ratings: Array.isArray(b.ratings) ? b.ratings : [],
          });
        });
      }
    } catch (e) {
      console.error("Error parsing localStorage books", e);
    }
  }
}

function getAvailableBooks() {
  return books.filter((b) => b.isAvailable === true);
}

// INITIAL LOAD
loadBooksFromStorage();
renderBooks();
