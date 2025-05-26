import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3001/usuarios';

const PersonaForm = ({ getPersonas, editar, setEditar }) => {
  const [persona, setPersona] = useState({ nombre: '', email: '', edad: '' });

  useEffect(() => {
    if (editar) {
      setPersona(editar);
    }
  }, [editar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editar) {
      await axios.put(`${API_URL}/${editar.id}`, persona);
      setEditar(null);
    } else {
      await axios.post(API_URL, persona);
    }
    setPersona({ nombre: '', email: '', edad: '' });
    getPersonas();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={persona.nombre}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={persona.email}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={persona.edad}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <button type="submit" className="btn btn-primary">
        {editar ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default PersonaForm;
