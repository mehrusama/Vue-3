const Book = require('../models/Book.js');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  const { title, author, publishedDate, genre, description, userId } = req.body;
  try {
    const book = new Book({
      title,
      author,
      publishedDate,
      genre,
      description,
      userId // Assign the book to the logged-in user
    });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const { userId } = req.query;
//     if (!userId) {
//       return res.status(400).send({ message: 'User ID is required' });
//     }

//     const books = await Book.find({ userId });
//     res.status(200).send(books);
//   } catch (error) {
//     res.status(500).send({ message: 'An error occurred while fetching books', error });
//   }
// });
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while fetching the books', error });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, userId } = req.body;

    // Find the book by ID and update its details
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description, userId },
      { new: true }
    );

    // If the book was not found, return an error
    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    // Return the updated book
    res.status(200).send(updatedBook);
  } catch (error) {
    // Handle any errors that occur during the update
    console.error('An error occurred while updating the book:', error);
    res.status(500).send({ message: 'An error occurred while updating the book', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    else{
    res.status(200).send(book)};
  } catch (error) {
    res.status(600).send(error);
  }
})

module.exports = router;
