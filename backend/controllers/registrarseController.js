const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validaciones de contraseña
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    if (password.length <= 5) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 5 caracteres' });
    }

    if (password.length > 20) {
      return res.status(400).json({ error: 'La contraseña no debe tener más de 20 caracteres' });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos una mayúscula' });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos un número' });
    }

    // Verificar si ya existe el usuario
    const existe = await Usuario.findOne({ username });
    if (existe) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      username,
      password: hashedPassword,
      role: role || 'user'
    });

    await nuevoUsuario.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario._id, username: nuevoUsuario.username, role: nuevoUsuario.role },
      "secreto123", // idealmente en .env
      { expiresIn: "365h" }
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: { id: nuevoUsuario._id, username, role: nuevoUsuario.role },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario', detalle: err.message });
  }
};

module.exports = { register };
