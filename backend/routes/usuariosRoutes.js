const express = require('express');
const router = express.Router();
const { listar, crear, editar, eliminar } = require('../controllers/usuariosController');

router.get('/', listar);
router.post('/', crear);
router.put('/:id', editar);
router.delete('/:id', eliminar);

module.exports = router;
