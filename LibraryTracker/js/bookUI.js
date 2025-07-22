import {
  books,
  getAverageRating,
  toggleAvailability,
  addRating,
  removeBook,
  getAvailableBooks,
} from "./bookData.js";

let isFiltered = false;
let isSorted = false;

export function renderBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  let displayBooks = [...books];
  if (isFiltered) displayBooks = displayBooks.filter((b) => b.isAvailable);
  if (isSorted) {
    displayBooks.sort((a, b) => {
      const avgA = parseFloat(getAverageRating(a.title)) || 0;
      const avgB = parseFloat(getAverageRating(b.title)) || 0;
      return avgB - avgA;
    });
  }

  displayBooks.forEach((book) => {
    const avg = parseFloat(getAverageRating(book.title)) || 0;
    const starHTML = Array.from({ length: 5 })
      .map((_, i) =>
        i < Math.round(avg)
          ? '<i class="fas fa-star text-yellow-400 text-sm"></i>'
          : '<i class="far fa-star text-gray-300 text-sm"></i>'
      )
      .join("");

    const div = document.createElement("div");
    div.className =
      "bg-white border-2 border-yellow-300 rounded-xl shadow-md p-4 flex flex-col justify-start items-center w-full";
    div.innerHTML = `
      <div class="w-full flex flex-col items-center">
        <img src="${
          book.image
        }" class="h-64 w-full object-cover rounded mb-3" />
        <div class="w-full text-left mb-2">
          <p class="text-sm font-semibold">${book.title}</p>
          <p class="text-xs text-gray-600">${book.author}</p>
          <p class="text-xs ${
            book.isAvailable ? "text-green-600" : "text-red-500"
          } font-medium">${book.isAvailable ? "Available" : "Unavailable"}</p>
        </div>
        <div class="flex gap-1 mb-3 w-full">${starHTML}</div>
        <div class="grid grid-cols-3 gap-2 w-full text-xs">
          <button onclick="toggleAvailability('${
            book.title
          }')" class="bg-green-300 px-2 py-1 rounded">Toggle</button>
          <button onclick="handleRating('${
            book.title
          }')" class="bg-lime-200 px-2 py-1 rounded">Add Rating</button>
          <button onclick="removeBook('${
            book.title
          }')" class="bg-red-200 px-2 py-1 rounded">Remove</button>
        </div>
      </div>
    `;
    bookList.appendChild(div);
  });

  showSummary();
}

export function showSummary() {
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

export function toggleSort() {
  isSorted = !isSorted;
  document.getElementById("sortBtn").textContent = isSorted
    ? "reset sort"
    : "sort by rating";
  renderBooks();
}

export function toggleFilter() {
  isFiltered = !isFiltered;
  document.getElementById("filterBtn").textContent = isFiltered
    ? "reset filter"
    : "show available only";
  renderBooks();
}
