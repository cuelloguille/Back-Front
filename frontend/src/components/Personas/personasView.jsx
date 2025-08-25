import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonasForm from "./personasForm";

const PersonasView = () => {
  const [personas, setPersonas] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", edad: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/usuarios";

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchPersonas();
  }, [token, navigate]);

  const fetchPersonas = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPersonas(res.data);
    } catch (err) {
      console.error("Error al cargar personas:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Token inválido o expirado. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(`${API_URL}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPersonas(personas.map((p) => (p.id === editId ? res.data : p)));
        setEditId(null);
      } else {
        const res = await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPersonas([...personas, res.data]);
      }
      setForm({ nombre: "", email: "", edad: "" });
    } catch (err) {
      console.error("Error al guardar persona:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro querés eliminar esta persona?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPersonas(personas.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar persona:", err);
    }
  };

  const handleEdit = (persona) => {
    setForm({ nombre: persona.nombre, email: persona.email, edad: persona.edad });
    setEditId(persona.id);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ nombre: "", email: "", edad: "" });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Personas</h2>

      {/* Formulario centrado */}
      <div className="d-flex justify-content-center mb-4">
        <PersonasForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editId={editId}
          handleCancel={handleCancel}
        />
      </div>

      {/* Tabla de personas */}
      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.length > 0 ? (
              personas.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.email}</td>
                  <td>{p.edad}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(p)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No hay personas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonasView;
