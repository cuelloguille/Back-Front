const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Solo usuarios autenticados pueden listar
router.get("/", verifyToken, usuariosController.listar);

// Crear usuario (solo admins)
router.post("/", verifyToken, isAdmin, usuariosController.crear);

// Editar usuario (solo admins)
router.put("/:id", verifyToken, isAdmin, usuariosController.editar);

// Eliminar usuario (solo admins)
router.delete("/:id", verifyToken, isAdmin, usuariosController.eliminar);

module.exports = router;
