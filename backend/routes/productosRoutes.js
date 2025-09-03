const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosControllers");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Listar todos los productos (cualquier usuario autenticado)
router.get("/", verifyToken, productosController.listar);

// Crear producto (solo admins)
router.post("/", verifyToken, isAdmin, productosController.crear);

// Editar producto (solo admins)
router.put("/:id", verifyToken, isAdmin, productosController.editar);

// Eliminar producto (solo admins)
router.delete("/:id", verifyToken, isAdmin, productosController.eliminar);

module.exports = router;
