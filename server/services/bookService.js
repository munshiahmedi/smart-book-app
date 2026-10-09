const pool = require("../config/database");


// GET ALL BOOKS
const getAllBooks = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM books ORDER BY id DESC"
  );

  return rows;
};


// GET BOOK BY ID
const getBookById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM books WHERE id = ?",
    [id]
  );

  return rows[0];
};


// CREATE BOOK
const createBook = async (bookData) => {
  const {
    title,
    author,
    isbn,
    category,
    description,
    created_by
  } = bookData;

  const [result] = await pool.query(
    `INSERT INTO books
    (title, author, isbn, category, description, created_by)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      title,
      author,
      isbn,
      category || null,
      description || null,
      created_by
    ]
  );

  return {
    id: result.insertId,
    title,
    author,
    isbn,
    category,
    description,
    created_by
  };
};


// UPDATE BOOK
const updateBook = async (id, bookData) => {
  const {
    title,
    author,
    isbn,
    category,
    description
  } = bookData;

  const [result] = await pool.query(
    `UPDATE books
     SET title = ?,
         author = ?,
         isbn = ?,
         category = ?,
         description = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      title,
      author,
      isbn,
      category || null,
      description || null,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getBookById(id);
};


// DELETE BOOK
const deleteBook = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM books WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};