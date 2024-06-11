require("dotenv").config(); // Cargar variables de entorno desde .env
const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos antes de configurar el servidor
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1);
  });
