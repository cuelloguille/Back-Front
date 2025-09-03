const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// 🔗 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas públicas
app.use("/", require("./routes/loginRoutes"));     // POST /login
app.use("/", require("./routes/registerRoutes"));  // POST /register

// Rutas protegidas (ejemplo con verifyToken)
const { verifyToken } = require("./middlewares/auth"); // verifyToken = require("./middlewares/auth");
app.use("/usuarios", verifyToken, require("./routes/usuariosRoutes"));
app.use("/productos", verifyToken, require("./routes/productosRoutes"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));


const Usuario = require('./models/Usuarios');
const bcrypt = require('bcrypt');

async function crearAdminPorDefecto() {
  try {
    const adminExistente = await Usuario.findOne({ role: "admin" });
    if (!adminExistente) {
      const passwordHasheada = await bcrypt.hash("admin123", 10);
      const nuevoAdmin = new Usuario({
        username: "administrador",
        password: passwordHasheada,
        role: "admin"
      });
      await nuevoAdmin.save();
      console.log("✅ Administrador por defecto creado: username='admin', password='admin123'");
    } else {
      console.log("✅ Administrador por defecto ya existe");
    }
  } catch (error) {
    console.error("❌ Error al crear el admin por defecto:", error);
  }
}

// Ejecutar después de conectar a MongoDB
crearAdminPorDefecto();
