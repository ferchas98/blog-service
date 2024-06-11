const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.status(200).json({ message: "Ready APIv1" });
});

// Rutas
app.use(require("./routes/userRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/postRoutes"));

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Middleware para manejar errores
app.use(errorHandler);

module.exports = app;
