import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import ProductoForm from './ProductoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3001/productos';

const ProductosView = () => {
  const [productos, setProductos] = useState([]);
  const [editar, setEditar] = useState(null);

  const getProductos = async () => {
    const res = await axios.get(API_URL);
    setProductos(res.data);
  };

  const eliminar = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    getProductos();
  };

  const exportarProductosPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Productos", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Nombre', 'Precio']],
      body: productos.map(p => [p.id, p.nombre, `$${p.precio}`]),
    });
    doc.save('productos.pdf');
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card shadow w-100" style={{ maxWidth: '900px' }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Gestión de Productos</h3>
          <button className="btn btn-outline-primary btn-sm" onClick={exportarProductosPDF}>
            Exportar PDF
          </button>
        </div>
        <div className="card-body">
          <ProductoForm getProductos={getProductos} editar={editar} setEditar={setEditar} />

          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Acciones">
                          <button className="btn btn-warning btn-sm" onClick={() => setEditar(producto)}>
                            Editar
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => eliminar(producto.id)}>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosView;
