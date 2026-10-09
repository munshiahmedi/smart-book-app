import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchBook = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await api.get(`/books/${id}`);

    console.log("Book response:", response.data);

    const book = response.data.data;

    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setCategory(book.category || "");
    setDescription(book.description || "");

  } catch (error) {
    console.error(
      "Failed to fetch book:",
      error.response?.data || error.message
    );

    setError(
      error.response?.data?.message ||
      "Failed to fetch book"
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await api.put(`/books/${id}`, {
        title,
        author,
        isbn,
        category,
        description
      });

      console.log("Book updated:", response.data);

      navigate("/books");
    } catch (error) {
      console.error(
        "Failed to update book:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to update book"
      );
    }
  };

  const handleDelete = async () => {
    try {
      setError("");

      const response = await api.delete(`/books/${id}`);

      console.log("Book deleted:", response.data);

      navigate("/books");
    } catch (error) {
      console.error(
        "Failed to delete book:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to delete book"
      );
    }
  };

  if (loading) {
    return <p>Loading book...</p>;
  }

  return (
    <div>
      <h1>Edit Book</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label>ISBN</label>
          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">
          Update Book
        </button>

        <button
          type="button"
          onClick={handleDelete}
        >
          Delete Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;