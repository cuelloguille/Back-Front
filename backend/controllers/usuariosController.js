const fs = require('fs');
const path = require('path');
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

exports.listar = (req, res) => res.json(getUsuarios());

exports.crear = (req, res) => {
  const usuarios = getUsuarios();
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  saveUsuarios(usuarios);
  res.status(201).json(nuevo);
};

exports.editar = (req, res) => {
  const usuarios = getUsuarios();
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    usuarios[index] = { id: usuarios[index].id, ...req.body };
    saveUsuarios(usuarios);
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

exports.eliminar = (req, res) => {
  const usuarios = getUsuarios().filter(u => u.id != req.params.id);
  saveUsuarios(usuarios);
  res.status(204).end();
};
