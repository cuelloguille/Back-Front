import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductoForm from "./productosForm";
import { toast } from "react-toastify";

const ProductosView = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/productos";

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔹 Verificar token y traer productos
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProductos();
    }
  }, [token, navigate]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Token inválido o expirado. Inicia sesión de nuevo.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      } else {
        toast.error("No se pudieron cargar los productos");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Crear o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Editar
        const { data } = await axios.put(`${API_URL}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos((prev) =>
          prev.map((p) => (p._id === editId ? data : p))
        );
        toast.success("Producto actualizado con éxito");
      } else {
        // Crear
        const { data } = await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos((prev) => [...prev, data]);
        toast.success("Producto creado con éxito");
      }
      resetForm();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      toast.error(err.response?.data?.mensaje || "Error al guardar producto");
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async (_id) => {
    if (!window.confirm("¿Seguro querés eliminar este producto?")) return;
    try {
      await axios.delete(`${API_URL}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos((prev) => prev.filter((p) => p._id !== _id));
      
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      toast.alert(err.response?.data?.mensaje || "Error al eliminar producto");
    }
    toast.error("Producto eliminado");
  };

  // 🔹 Preparar formulario para editar
  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      descripcion: producto.descripcion,
    });
    setEditId(producto._id);
  };

  // 🔹 Reset form
  const resetForm = () => {
    setEditId(null);
    setForm({ nombre: "", precio: "", stock: "", descripcion: "" });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Productos</h2>

      {/* Formulario solo para admins */}
      {role === "admin" && (
        <div className="d-flex justify-content-center mb-4">
          <ProductoForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            editId={editId}
            handleCancel={resetForm}
          />
        </div>
      )}

      {/* Tabla de productos */}
      {loading ? (
        <p className="text-center text-muted">Cargando productos...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Descripción</th>
                {role === "admin" && <th className="text-center">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((p) => (
                  <tr key={p._id}>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>{p.stock}</td>
                    <td>{p.descripcion}</td>
                    {role === "admin" && (
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(p._id)}
                        >
                          Borrar
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={role === "admin" ? 5 : 4}
                    className="text-center text-muted"
                  >
                    No hay productos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductosView;
