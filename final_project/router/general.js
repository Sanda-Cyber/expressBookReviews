const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.use(express.json());

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});



 // Get the book list available in the shop
 // Obtener la lista de libros disponibles en la tienda de forma asíncrona (Get all books - Using async callback function)
public_users.get('/', async (req, res) => {
    try {
        const books = await new Promise((resolve, reject) => {
            // Suponiendo que aquí haya una lógica para obtener la lista de libros de forma asíncrona

            const bookData = {
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
            
            resolve(bookData);
        });

        res.send(JSON.stringify({ books }, null, 4));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de libros' });
    }
});
;


    

// Get book details based on ISBN
// Get the list of books available in the store asynchronously (Get all books - Using async callback function)
public_users.get('/books', async (req, res) => {
    try {
    const books = await new Promise((resolve, reject) => {
    // Here the logic would go to obtain the list of books asynchronously
   
    const bookData = {
    1: {
    isbn: "1",
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: []
    },
    2: {
    isbn: "2",
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: []
    },
    // Rest of the books...
    };
   
    resolve(bookData);
    });
   
    res.send(JSON.stringify({ books }, null, 4));
    } catch (error) {
    res.status(500).json({ error: 'Error getting list of books' });
    }
   });
   
   // Get book details based on ISBN
   public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn]; // You can customize this logic depending on the data structure you have
    if (book) {
    res.json(book);
    } else {
    res.status(404).send('Book not found');
    }
   });
  
  // Get book details based on author
// Search books by author asynchronously (Search by Author - Using async function)
public_users.get('/author/:author', async (req, res) => {
    try {
    const author = req.params.author;
    const booksByAuthor = await new Promise((resolve, reject) => {
    // Here the logic would go to search for books by author asynchronously
    let booksByAuthorArr = [];
   
    // Assuming there is logic here to get the books by author asynchronously
    const isbns = Object.keys(books);
    isbns.forEach((isbn) => {
    if (books[isbn]["author"] === author) {
    booksByAuthorArr.push({
    isbn: isbn,
    title: books[isbn]["title"],
    reviews: books[isbn]["reviews"]
    });
    }
    });
   
    resolve(booksByAuthorArr);
    });
   
    res.send(JSON.stringify({ booksByAuthor }, null, 4));
    } catch (error) {
    res.status(500).json({ error: 'Error searching for books by author' });
    }
   });
  

// Get all books based on title
// Search books by title asynchronously (Search by Title - Using async function)
public_users.get('/title/:title', async (req, res) => {
    try {
    const title = req.params.title;
    const booksByTitle = await new Promise((resolve, reject) => {
    // Here the logic would go to search for books by title asynchronously
    let booksByTitleArr = [];
   
    // Assuming there is logic here to get the books by title asynchronously
    const isbns = Object.keys(books);
    isbns.forEach((isbn) => {
    if (books[isbn]["title"] === title) {
    booksByTitleArr.push({
    isbn: isbn,
    author: books[isbn]["author"],
    reviews: books[isbn]["reviews"]
    });
    }
    });
   
    resolve(booksByTitleArr);
    });
   
    res.send(JSON.stringify({ booksByTitle }, null, 4));
    } catch (error) {
    res.status(500).json({ error: 'Error searching for books by title' });
    }
   });
   


// Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).send('Book not found');
    }
  });


//Login as registered user and generate JWT token
public_users.post('/login', (req, res) => {
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
  
  


module.exports.general = public_users;