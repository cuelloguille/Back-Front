const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/auth", require("./routes/auth"));

// Rutas protegidas
app.use("/usuarios", require("./routes/usuariosRoutes"));

// Rutas de productos (pueden estar abiertas o protegerlas con verifyToken si querés)
app.use("/productos", require("./routes/productosRoutes"));

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
