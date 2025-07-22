import { books } from "./bookData.js";

export function saveBooksToStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

export function loadBooksFromStorage() {
  const data = localStorage.getItem("books");
  books.length = 0;
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        parsed.forEach((b) =>
          books.push({
            title: b.title ?? "Unknown",
            author: b.author ?? "Unknown",
            image:
              b.image ?? "https://via.placeholder.com/150x220?text=No+Image",
            isAvailable:
              typeof b.isAvailable === "boolean" ? b.isAvailable : true,
            ratings: Array.isArray(b.ratings) ? b.ratings : [],
          })
        );
      }
    } catch (e) {
      console.error("Failed to load books from storage", e);
    }
  }
}
