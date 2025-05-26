const fs = require('fs');
const path = require('path');
const archivo = path.join(__dirname, '../data/productos.json');

const getProductos = () => {
  try {
    const data = fs.readFileSync(archivo, 'utf8') || '[]';
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveProductos = (productos) => {
  fs.writeFileSync(archivo, JSON.stringify(productos, null, 2));
};

exports.listar = (req, res) => res.json(getProductos());

exports.crear = (req, res) => {
  const productos = getProductos();
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  saveProductos(productos);
  res.status(201).json(nuevo);
};

exports.editar = (req, res) => {
  const productos = getProductos();
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    productos[index] = { id: productos[index].id, ...req.body };
    saveProductos(productos);
    res.json(productos[index]);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
};

exports.eliminar = (req, res) => {
  const productos = getProductos().filter(p => p.id != req.params.id);
  saveProductos(productos);
  res.status(204).end();
};
