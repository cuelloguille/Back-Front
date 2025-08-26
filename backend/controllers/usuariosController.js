const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const archivo = path.join(__dirname, "../data/usuarios.json");

const getUsuarios = () => {
  try {
    const data = fs.readFileSync(archivo, "utf8") || "[]";
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveUsuarios = (usuarios) => {
  fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
};

// Listar todos
exports.listar = (req, res) => {
  const usuarios = getUsuarios();
  res.json(usuarios);
};

// Crear usuario
exports.crear = async (req, res) => {
  const usuarios = getUsuarios();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const nuevo = {
    id: Date.now(),
    username: req.body.username,
    role: req.body.role || "user",
    password: hashedPassword,
  };
  usuarios.push(nuevo);
  saveUsuarios(usuarios);
  res.status(201).json({ id: nuevo.id, username: nuevo.username, role: nuevo.role });
};

// Editar usuario (solo admins pueden cambiar role)
exports.editar = async (req, res) => {
  const usuarios = getUsuarios();
  const index = usuarios.findIndex((u) => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  const usuario = usuarios[index];
  usuario.username = req.body.username || usuario.username;

  if (req.body.role) usuario.role = req.body.role; // solo admins lo envían
  if (req.body.password) usuario.password = await bcrypt.hash(req.body.password, 10);

  saveUsuarios(usuarios);
  res.json({ id: usuario.id, username: usuario.username, role: usuario.role });
};

// Eliminar usuario
exports.eliminar = (req, res) => {
  const usuarios = getUsuarios().filter((u) => u.id != req.params.id);
  saveUsuarios(usuarios);
  res.status(204).end();
};
