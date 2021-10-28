// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  res.render('books/details', { books: { _id: "add" }, title: "Add a new book" });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  const newBook = new book({
    Title: req.body.title,
    Description: "", // not provided in details page
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  newBook.save()
    .then(() => { console.log("Book added") })
    .catch(err => { console.log(err) });
  res.redirect('/books');

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findById(req.params.id, (err, task) => {
    if (err) { res.send(500, err) };
    res.render('books/details', { title: "Update the book", books: task })
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  const updateBook = {
    Title: req.body.title,
    Description: "", // not provided in details page
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  };
  book.findByIdAndUpdate(req.params.id, updateBook)
    .then(() => { console.log("Book Updated") })
    .catch(err => { console.log(err) });
  res.redirect('/books');

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findByIdAndRemove(req.params.id)
    .then(() => { console.log("book deleted") })
    .catch(err => { console.log(err) });
  res.redirect('/books');

});


module.exports = router;
