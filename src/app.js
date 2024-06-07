require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Middleware para manejo de errores
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});
app.use(errorMiddleware);

module.exports = app;
