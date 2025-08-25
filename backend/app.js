const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/", require("./routes/loginRoutes"));     // POST /login
app.use("/", require("./routes/registerRoutes"));  // POST /register

// Rutas protegidas (ejemplo con verifyToken)
const verifyToken = require("./middlewares/verifyToken");
app.use("/usuarios", verifyToken, require("./routes/usuariosRoutes"));
app.use("/productos", verifyToken, require("./routes/productosRoutes"));

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
