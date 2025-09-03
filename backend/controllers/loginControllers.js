const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario en MongoDB
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario._id, username: usuario.username, role: usuario.role },
      "secreto123", // idealmente ponerlo en .env
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: usuario._id,
        username: usuario.username,
        role: usuario.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", detalle: err.message });
  }
};
