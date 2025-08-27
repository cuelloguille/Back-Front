// controllers/registerController.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); // para encriptar contraseña
const jwt = require('jsonwebtoken'); // para generar token

const archivo = path.join(__dirname, '../data/usuarios.json');

// Función auxiliar: leer usuarios
const getUsuarios = () => {
  try {
    const data = fs.readFileSync(archivo, 'utf8') || '[]';
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Función auxiliar: guardar usuarios
const saveUsuarios = (usuarios) => {
  fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2), 'utf8');
};

// Controlador para registrar
const register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  if (password.length <= 5 ) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 5 caracteres' });
  }
  const mayuscula = /[A-Z]/;
  if (!mayuscula.test(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos una mayuscula' });
  }

  if (password.length > 20 ) {
    return res.status(400).json({ error: 'La contraseña no debe tener mas de 12 caracteres' });
  }
  const numero = /[0-9]/;
  if (!numero.test(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos un numero' });
  }
  try {
    let usuarios = getUsuarios();

    // validar que no exista el usuario
    const existe = usuarios.find(u => u.username === username);
    if (existe) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = {
      id: Date.now(), // o algún generador de IDs
      username,
      password: hashedPassword,
      role: role || 'user'
    };

    usuarios.push(nuevoUsuario);
    saveUsuarios(usuarios);

    // 🔹 Generar token JWT al registrar
    const token = jwt.sign(
      { id: nuevoUsuario.id, username: nuevoUsuario.username, role: nuevoUsuario.role },
      "secreto123", // clave secreta del servidor
      { expiresIn: "365h" }
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: { id: nuevoUsuario.id, username, role: nuevoUsuario.role },
      token // 🔹 enviamos también el token al frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

module.exports = { register };

