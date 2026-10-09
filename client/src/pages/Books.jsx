import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/books");

      console.log("Books response:", response.data);

      setBooks(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch books:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to fetch books"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>SmartBook Books</h1>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong>
              {" - "}
              {book.author}
              {" - "}
              {book.isbn}

              {" "}

              <Link to={`/edit-book/${book.id}`}>
                <button type="button">
                  Edit
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Books;