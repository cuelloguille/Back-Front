const Producto = require('../models/Productos');

// Listar todos los productos
exports.listar = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: err.message });
  }
};

// Crear un producto nuevo
exports.crear = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear producto', error: err.message });
  }
};

// Editar un producto existente
exports.editar = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida
    );
    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error: err.message });
  }
};

// Eliminar un producto
exports.eliminar = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: err.message });
  }
};
