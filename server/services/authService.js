const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const registerUser = async (userData) => {
  const {
    name,
    email,
    password
  } = userData;

  // Check whether email already exists
  const [existingUsers] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUsers.length > 0) {
    const error = new Error("Email already registered");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  const [result] = await pool.query(
    `INSERT INTO users
     (name, email, password)
     VALUES (?, ?, ?)`,
    [name, email, hashedPassword]
  );

  // Get the newly created user
  const [users] = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at
     FROM users
     WHERE id = ?`,
    [result.insertId]
  );

  return users[0];
};
const loginUser = async (email, password) => {
  const [users] = await pool.query(
    `SELECT id, name, email, password, role
     FROM users
     WHERE email = ?`,
    [email]
  );

  if (users.length === 0) {
    const error = new Error("Invalid credentials");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const user = users[0];

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};
module.exports = {
  registerUser,loginUser
};