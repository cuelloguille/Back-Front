import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductoForm from "./productosForm";

const ProductosView = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/productos";

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProductos();
    }
  }, [token, navigate]);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
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
        setProductos(productos.map((p) => (p.id === editId ? res.data : p)));
        setEditId(null);
      } else {
        const res = await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos([...productos, res.data]);
      }
      setForm({ nombre: "", precio: "" });
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro querés eliminar este producto?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const handleEdit = (producto) => {
    setForm({ nombre: producto.nombre, precio: producto.precio });
    setEditId(producto.id);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ nombre: "", precio: "" });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Productos</h2>

      {/* Formulario Crear/Editar centrado */}
      <div className="d-flex justify-content-center mb-4">
        <ProductoForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editId={editId}
          handleCancel={handleCancel}
        />
      </div>

      {/* Tabla de productos */}
      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
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
                <td colSpan="3" className="text-center text-muted">
                  No hay productos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosView;
