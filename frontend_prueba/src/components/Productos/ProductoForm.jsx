import React, { useEffect, useState } from 'react';

const ProductoForm = ({ onSave, productoEdit }) => {
  const [form, setForm] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    if (productoEdit) setForm(productoEdit);
    else setForm({ nombre: '', precio: '' });
  }, [productoEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ nombre: '', precio: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input className="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input className="form-control" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
      </div>
      <button className="btn btn-primary" type="submit">Guardar</button>
    </form>
  );
};

export default ProductoForm;
