const app = require("./src/app");

// Establece el puerto, usa el puerto por defecto si no se especifica un puerto en las variables de entorno
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
