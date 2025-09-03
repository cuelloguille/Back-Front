import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PersonasForm from "./personasForm";

const PersonasView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/usuarios";
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔹 Verificar token y traer usuarios
  useEffect(() => {
    if (!token) navigate("/login");
    else fetchUsuarios();
  }, [token, navigate]);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      toast.error("No se pudieron cargar los usuarios");
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Token inválido o expirado. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    }
  };

  // 🔹 Crear o editar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editId) {
        res = await axios.put(`${API_URL}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(usuarios.map((u) => (u._id === editId ? res.data : u)));
        setEditId(null);
        toast.success("Usuario editado correctamente");
      } else {
        res = await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios([...usuarios, res.data]);
        toast.success("Usuario creado correctamente");
      }
      setForm({ username: "", password: "", role: "" });
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      toast.error(err.response?.data?.mensaje || "Error al guardar usuario");
    }
  };

  // 🔹 Eliminar usuario
  const handleDelete = async (_id) => {
    if (!window.confirm("¿Seguro querés eliminar este usuario?")) return;
    try {
      await axios.delete(`${API_URL}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(usuarios.filter((u) => u._id !== _id));
      toast.success("Usuario eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      toast.error(err.response?.data?.mensaje || "Error al eliminar usuario");
    }
  };

  // 🔹 Preparar formulario para editar
  const handleEdit = (usuario) => {
    setForm({ username: usuario.username, password: "", role: usuario.role });
    setEditId(usuario._id);
  };

  // 🔹 Cancelar edición
  const handleCancel = () => {
    setEditId(null);
    setForm({ username: "", password: "", role: "" });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Usuarios</h2>

      {role === "admin" && (
        <div className="d-flex justify-content-center mb-4">
          <PersonasForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            editId={editId}
            handleCancel={handleCancel}
          />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              {role === "admin" && <th className="text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  {role === "admin" && (
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(u)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(u._id)}
                      >
                        Borrar
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No hay usuarios registrados
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
