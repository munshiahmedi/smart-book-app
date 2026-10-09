const bookService = require("../services/bookService");


// GET ALL BOOKS
const getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();

    res.status(200).json({
      success: true,
      data: books
    });
  } catch (error) {
    next(error);
  }
};


// GET BOOK BY ID
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await bookService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};


// CREATE BOOK
const createBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      description
    } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({
        success: false,
        message: "Title, author and ISBN are required"
      });
    }

    const book = await bookService.createBook({
      title,
      author,
      isbn,
      category,
      description,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book
    });
  } catch (error) {

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "ISBN already exists"
      });
    }

    next(error);
  }
};


// UPDATE BOOK
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      author,
      isbn,
      category,
      description
    } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({
        success: false,
        message: "Title, author and ISBN are required"
      });
    }

    const book = await bookService.updateBook(id, {
      title,
      author,
      isbn,
      category,
      description
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book
    });
  } catch (error) {

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "ISBN already exists"
      });
    }

    next(error);
  }
};


// DELETE BOOK
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await bookService.deleteBook(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};