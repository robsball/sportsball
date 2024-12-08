import express from "express";
import { PrismaClient } from "@prisma/client";


const app = express();

// Redirect traffic from sportsball.life to www.sportsball.life
app.use((req, res, next) => {
  if (req.hostname === "sportsball.life") {
    res.redirect(301, `https://www.sportsball.life${req.originalUrl}`);
  } else {
    next();
  }
});

// Example root route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Use the Heroku-assigned port or default to 3000 for local development
const PORT = parseInt(process.env.PORT || "4000", 10); // Parse PORT to an integer
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});


const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});