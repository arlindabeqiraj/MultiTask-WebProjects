import { saveBooksToStorage } from "./bookStorage.js";
import { renderBooks } from "./bookUI.js";

export const books = [];

export function addBook(book) {
  books.push(book);
  saveBooksToStorage();
  renderBooks();
}

export function removeBook(title) {
  const index = books.findIndex((b) => b.title === title);
  if (index !== -1) {
    books.splice(index, 1);
    saveBooksToStorage();
    renderBooks();
  }
}

export function toggleAvailability(title) {
  const book = books.find((b) => b.title === title);
  if (book) {
    book.isAvailable = !book.isAvailable;
    saveBooksToStorage();
    renderBooks();
  }
}

export function addRating(title, rating) {
  const book = books.find((b) => b.title === title);
  if (book && rating >= 1 && rating <= 5) {
    book.ratings.push(rating);
    saveBooksToStorage();
    renderBooks();
  }
}

export function getAverageRating(title) {
  const book = books.find((b) => b.title === title);
  if (book && book.ratings.length > 0) {
    const sum = book.ratings.reduce((a, b) => a + b, 0);
    return (sum / book.ratings.length).toFixed(1);
  }
  return "No ratings";
}

export function getAvailableBooks() {
  return books.filter((b) => b.isAvailable === true);
}
