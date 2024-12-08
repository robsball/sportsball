import express from "express";

const app = express();

// Example root route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Use the Heroku-assigned port or default to 3000 for local development
const PORT = process.env.PORT || 4000; // Default to 4000 for local dev
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});