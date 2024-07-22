"use strict";
// Initialize the books array with some sample data
const books = [
    { title: "Book A", author: "Author X", genre: "Fiction", publicationDate: "2023-01-01", rating: 4 },
    { title: "Book B", author: "Author Y", genre: "Non-Fiction", publicationDate: "2022-12-15", rating: 5 },
    { title: "Book C", author: "Author Z", genre: "Fantasy", publicationDate: "2023-02-20", rating: 3 },
    { title: "Book D", author: "Author X", genre: "Fiction", publicationDate: "2022-11-05", rating: 4 }
];
// const books: Book[] = [];
// Function to display books on the page
function displayBooks(filteredBooks = books) {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = ''; // Clear the current book list
    filteredBooks.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Publication Date: ${book.publicationDate}</p>
            <p>Rating: ${book.rating}</p>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        `;
        booksDiv.appendChild(bookDiv); // Add the book to the display
    });
    updateInventorySummary(); // Update the inventory summary
}
// Function to edit a book
function editBook(index) {
    const book = books[index];
    document.getElementById('edit-index').value = index.toString();
    document.getElementById('edit-title').value = book.title;
    document.getElementById('edit-author').value = book.author;
    document.getElementById('edit-genre').value = book.genre;
    document.getElementById('edit-publicationDate').value = book.publicationDate;
    document.getElementById('edit-rating').value = book.rating.toString();
    openEditModal();
}
// Function to delete a book
function deleteBook(index) {
    books.splice(index, 1); // Remove the book from the array
    displayBooks(); // Update the displayed book list
}
// Function to open the edit modal
function openEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'block';
}
// Function to close the edit modal
function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
}
// Function to save changes to a book
function saveChanges(event) {
    event.preventDefault(); // Prevent the default form submission
    const index = parseInt(document.getElementById('edit-index').value);
    const title = document.getElementById('edit-title').value;
    const author = document.getElementById('edit-author').value;
    const genre = document.getElementById('edit-genre').value;
    const publicationDate = document.getElementById('edit-publicationDate').value;
    const rating = parseInt(document.getElementById('edit-rating').value);
    books[index] = { title, author, genre, publicationDate, rating }; // Update the book in the array
    closeEditModal(); // Close the edit modal
    displayBooks(); // Update the displayed book list
}
// Function to update the inventory summary
function updateInventorySummary() {
    const totalBooks = books.length;
    // Count the number of books by genre and author
    const genresCount = {};
    const authorsCount = {};
    books.forEach(book => {
        genresCount[book.genre] = (genresCount[book.genre] || 0) + 1;
        authorsCount[book.author] = (authorsCount[book.author] || 0) + 1;
    });
    // Update the total books count
    const totalBooksElement = document.getElementById('total-books');
    if (totalBooksElement) {
        totalBooksElement.textContent = totalBooks.toString();
    }
    // Update the genres list
    const genresList = document.getElementById('genres-list');
    genresList.innerHTML = '';
    for (const genre in genresCount) {
        const li = document.createElement('li');
        li.textContent = `${genre}: ${genresCount[genre]}`;
        genresList.appendChild(li);
    }
    // Update the authors list
    const authorsList = document.getElementById('authors-list');
    authorsList.innerHTML = '';
    for (const author in authorsCount) {
        const li = document.createElement('li');
        li.textContent = `${author}: ${authorsCount[author]}`;
        authorsList.appendChild(li);
    }
}
// Function to sort books by title
function sortByTitle() {
    books.sort((a, b) => a.title.localeCompare(b.title));
    displayBooks();
}
// Function to sort books by rating
function sortByRating() {
    books.sort((a, b) => a.rating - b.rating);
    displayBooks();
}
// Function to sort books by publication date
function sortByDate() {
    books.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime());
    displayBooks();
}
// Function to apply filters to the book list
function applyFilters() {
    const author = document.getElementById('author').value.toLowerCase();
    const genre = document.getElementById('genre').value.toLowerCase();
    const rating = parseInt(document.getElementById('rating').value);
    // Filter the books based on the input values
    const filteredBooks = books.filter(book => {
        return ((author === '' || book.author.toLowerCase().includes(author)) &&
            (genre === '' || book.genre.toLowerCase().includes(genre)) &&
            (isNaN(rating) || book.rating === rating));
    });
    displayBooks(filteredBooks); // Display the filtered books
}
// Function to open the modal for adding a new book
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}
// Function to clear the input fields in the modal
function clearInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('modal-author').value = '';
    document.getElementById('modal-genre').value = '';
    document.getElementById('publicationDate').value = '';
    document.getElementById('modal-rating').value = '';
}
// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    clearInputFields(); // Clear the input fields when closing the modal
}
// Function to add a new book to the list
function addBook(event) {
    event.preventDefault(); // Prevent the default form submission
    // Get the values from the input fields
    const title = document.getElementById('title').value;
    const author = document.getElementById('modal-author').value;
    const genre = document.getElementById('modal-genre').value;
    const publicationDate = document.getElementById('publicationDate').value;
    const rating = parseInt(document.getElementById('modal-rating').value);
    // Create a new book object
    const newBook = { title, author, genre, publicationDate, rating };
    books.push(newBook); // Add the new book to the array
    closeModal(); // Close the modal
    displayBooks(); // Update the displayed book list
}
// Initialize the page by displaying the books and setting up the form submission handler
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    const addBookForm = document.getElementById('addBookForm');
    addBookForm.addEventListener('submit', addBook);
    const editBookForm = document.getElementById('editBookForm');
    editBookForm.addEventListener('submit', saveChanges);
});
