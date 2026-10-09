const express = require("express");

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Get all books
router.get("/", authMiddleware, getBooks);


// Get one book
router.get("/:id", authMiddleware, getBookById);


// Create book
router.post("/", authMiddleware, createBook);


// Update book
router.put("/:id", authMiddleware, updateBook);


// Delete book
router.delete("/:id", authMiddleware, deleteBook);


module.exports = router;