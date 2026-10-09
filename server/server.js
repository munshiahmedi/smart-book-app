require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = 5000;

const startServer = async () => {
  try {
    // Test database connection
    const connection = await pool.getConnection();

    console.log("Database connected successfully");

    connection.release();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();