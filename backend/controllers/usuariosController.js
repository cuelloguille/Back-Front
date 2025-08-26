const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); // 
const archivo = path.join(__dirname, '../data/usuarios.json');

const getUsuarios = () => {
  try {
    const data = fs.readFileSync(archivo, 'utf8') || '[]';
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveUsuarios = (usuarios) => {
  fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
};

// Listar todos
exports.listar = (req, res) => res.json(getUsuarios());

// Crear nuevo usuario con password encriptada
exports.crear = async (req, res) => {
  const usuarios = getUsuarios();
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // 
  const nuevo = { 
    id: Date.now(), 
    username: req.body.username, 
    role: req.body.role, 
    password: hashedPassword 
  };
  usuarios.push(nuevo);
  saveUsuarios(usuarios);
  res.status(201).json({ id: nuevo.id, username: nuevo.username, role: nuevo.role }); 
};

// Editar usuario (si mandan nueva password se re-encripta)
exports.editar = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ mensaje: 'Solo los administradores pueden editar usuarios' });
  }
  const usuarios = getUsuarios();
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    const usuario = usuarios[index];
    usuario.username = req.body.username || usuario.username;
    usuario.role = req.body.role || usuario.role;
    if (req.body.password) {
      usuario.password = await bcrypt.hash(req.body.password, 10);
    }
    saveUsuarios(usuarios);
    res.json({ id: usuario.id, username: usuario.username, role: usuario.role });
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

// Eliminar
exports.eliminar = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ mensaje: 'Solo los administradores pueden eliminar usuarios' });
  }
  const usuarios = getUsuarios().filter(u => u.id != req.params.id);
  saveUsuarios(usuarios);
  res.status(204).end();
};

