import express from "express";

const app = express();

// Example root route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Use the Heroku-assigned port or default to 3000 for local development
const PORT = parseInt(process.env.PORT || "4000", 10); // Parse PORT to an integer
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});