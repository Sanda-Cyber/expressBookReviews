let books = {
 1: {
 "isbn": "1",
 "author": "Chinua Achebe",
 "title": "Things Fall Apart",
 "reviews": []
 },
 2: {
 "isbn": "2",
 "author": "Hans Christian Andersen",
 "title": "Fairy tales",
 "reviews": []
 },
 3: {
 "isbn": "3",
 "author": "Dante Alighieri",
 "title": "The Divine Comedy",
 "reviews": []
 },
 4: {
 "isbn": "4",
 "author": "Unknown",
 "title": "The Epic Of Gilgamesh",
 "reviews": []
 },
 5: {
 "isbn": "5",
 "author": "Unknown",
 "title": "The Book Of Job",
 "reviews": []
 },
 6: {
 "isbn": "6",
 "author": "Unknown",
 "title": "One Thousand and One Nights",
 "reviews": []
 },
 7: {
 "isbn": "7",
 "author": "Unknown",
 "title": "Nj\u00e1l's Saga",
 "reviews": []
 },
 8: {
 "isbn": "8",
 "author": "Jane Austen",
 "title": "Pride and Prejudice",
 "reviews": []
 },
 9: {
 "isbn": "9",
 "author": "Honor of Balzac",
 "title": "Le P\u00e8re Goriot",
 "reviews":[]
 },
 10: {
 "isbn": "10",
 "author": "Samuel Beckett",
 "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
 "reviews": []
 }
}


function addBookReview(isbn, review) {
 const bookKey = Object.keys(books).find(key => books[key].isbn === isbn);
 if (!bookKey) return null; // Return null if the book is not found

 // Add the review to the book's reviews array
 books[bookKey].reviews.push(review);

 return books[bookKey];
}



function getBookReviewByIsbn(isbn) {
 // Search for the book by ISBN in the 'books' object
 const book = Object.values(books).find(book => book.isbn === isbn);
 // Return the first revision of the book, or undefined if it has no revisions
 return book? book.reviews[0] : undefined;
 }


 module.exports = {...books, addBookReview};
 