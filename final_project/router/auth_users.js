express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const { addBookReview } = require("./booksdb.js");

let users = [
 
];




const isValid = (username) => {
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}



//only registered users can login
regd_users.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }});

// Add a book review
// auth_users.js

regd_users.put("/auth/review/:isbn", (req, res) => {
  const { username, review } = req.body;
  const isbn = req.params.isbn;

  // Search the book by ISBN
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  // Check if the user already has a review for this book
  const existingReviewIndex = book.reviews.findIndex(review => review.username === username);
  if (existingReviewIndex!== -1) {
    // Modify the existing review
    book.reviews[existingReviewIndex].content = review;
    return res.status(200).json({ message: "Review updated successfully." });
  } else {
    // Add a new review
    book.reviews.push({ username, content: review });
    return res.status(201).json({ message: `The review for the book with ISBM ${isbn} has been  added/updated .`});
  }
});


// Add this route DELETE 
// Path to delete the review of a specific book by its ISBN
regd_users.delete('/auth/review/:isbn/:username', (req, res) => {
  const { isbn, username } = req.params;
  const reviewToDelete = 'good';

  // Search for the book by its ISBN
  const book = books[isbn];

  // Check if the book was found
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  // Find and delete the specific review
  const reviewIndex = book.reviews.findIndex(r => r.content === reviewToDelete && r.username === username);

  // Check if the review was found
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found for this user.' });
  }

  // Delete the corresponding review
  book.reviews.splice(reviewIndex, 1);
  return res.status(200).json({ message: `Review for the ISBN ${isbn} deleted for the user ${username}.` });
});





module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

