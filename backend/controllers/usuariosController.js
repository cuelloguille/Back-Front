const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');

// Listar todos los usuarios (sin contraseñas)
exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-password'); // excluir password
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
  }
};

// Crear usuario
exports.crear = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validar existencia de username
    const existe = await Usuario.findOne({ username });
    if (existe) return res.status(400).json({ mensaje: 'El usuario ya existe' });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({ username, password: hashedPassword, role });
    await nuevoUsuario.save();

    res.status(201).json({ id: nuevoUsuario._id, username: nuevoUsuario.username, role: nuevoUsuario.role });
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error: err.message });
  }
};

// Editar usuario
exports.editar = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (role) updateData.role = role; // solo admins deberían enviarlo

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.json(usuarioActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al actualizar usuario', error: err.message });
  }
};

// Eliminar usuario
exports.eliminar = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: err.message });
  }
};
