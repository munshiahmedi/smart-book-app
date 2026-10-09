import { useState } from "react";
import api from "../api/axios";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      setError("Title, author and ISBN are required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/books", {
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        category: category.trim(),
        description: description.trim()
      });

      console.log("Book created:", response.data);

      setSuccess("Book created successfully");

      setTitle("");
      setAuthor("");
      setIsbn("");
      setCategory("");
      setDescription("");
    } catch (error) {
      console.error(
        "Failed to create book:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to create book"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Book</h1>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default AddBook;