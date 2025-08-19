const express = require("express");
const router = express.Router();
const { listar, crear, editar, eliminar } = require("../controllers/usuariosController");
const verifyToken = require("../middlewares/verifyToken");

// Todas las rutas de usuarios protegidas
router.use(verifyToken);

router.get("/", listar);
router.post("/", crear);
router.put("/:id", editar);
router.delete("/:id", eliminar);

module.exports = router;
