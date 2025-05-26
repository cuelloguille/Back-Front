import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PersonaForm from './personaForm';

const API_URL = 'http://localhost:3001/usuarios';

const PersonasView = () => {
  const [personas, setPersonas] = useState([]);
  const [editar, setEditar] = useState(null);

  const getPersonas = async () => {
    const res = await axios.get(API_URL);
    setPersonas(res.data);
  };

  const eliminar = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    getPersonas();
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Personas", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Nombre', 'Email', 'Edad']],
      body: personas.map(u => [u.id, u.nombre, u.email, u.edad]),
    });
    doc.save('personas.pdf');
  };

  useEffect(() => {
    getPersonas();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card shadow w-100" style={{ maxWidth: '900px' }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Gestión de Personas</h3>
          <button className="btn btn-outline-primary btn-sm" onClick={exportarPDF}>
            Exportar PDF
          </button>
        </div>
        <div className="card-body">
          <PersonaForm getPersonas={getPersonas} editar={editar} setEditar={setEditar} />
          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Edad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personas.map((persona) => (
                  <tr key={persona.id}>
                    <td>{persona.nombre}</td>
                    <td>{persona.email}</td>
                    <td>{persona.edad}</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-warning btn-sm" onClick={() => setEditar(persona)}>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminar(persona.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {personas.length === 0 && (
              <div className="alert alert-info text-center">
                No hay personas registradas aún.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonasView;
