
const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "SmartBook API is running"
  });
});
app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Profile accessed successfully",
      user: req.user
    });
  }
);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

module.exports = app;