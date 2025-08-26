const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

// 🔐 rutas protegidas
router.get("/", verifyToken, usuariosController.listar);          // listar todos
router.post("/", verifyToken, isAdmin, usuariosController.crear); // solo admins pueden crear
router.put("/:id", verifyToken, isAdmin, usuariosController.editar); // solo admins
router.delete("/:id", verifyToken, isAdmin, usuariosController.eliminar); // solo admins

module.exports = router;
