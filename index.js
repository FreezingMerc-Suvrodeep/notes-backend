require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

connectDB();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ IMPORT ROUTES
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

// ✅ USE ROUTES (ADD HERE)
app.use("/", userRoutes);
app.use("/", noteRoutes);
app.use(errorHandler);

// start server
app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});

