import React from "react";
import { Form, Button } from "react-bootstrap";

const PersonasForm = ({ form, setForm, handleSubmit, editId, handleCancel }) => {
  return (
    <Form
      onSubmit={handleSubmit}
      className="p-4 rounded shadow-sm d-flex flex-column align-items-center"
      style={{
        maxWidth: "450px",
        margin: "0 auto",
        backgroundColor: "#1f1f1f",
        color: "#f0f0f0",
      }}
    >
      <Form.Group className="mb-3 w-100" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          style={{ backgroundColor: "#2c2c2c", color: "#f0f0f0", border: "1px solid #444" }}
        />
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ backgroundColor: "#2c2c2c", color: "#f0f0f0", border: "1px solid #444" }}
        />
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="edad">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese edad"
          value={form.edad}
          onChange={(e) => setForm({ ...form, edad: e.target.value })}
          required
          style={{ backgroundColor: "#2c2c2c", color: "#f0f0f0", border: "1px solid #444" }}
        />
      </Form.Group>

      <div className="d-flex justify-content-center gap-2 w-100">
        <Button variant="warning" type="submit" className="flex-grow-1">
          {editId ? "Editar" : "Crear"}
        </Button>
        {editId && (
          <Button
            variant="danger"
            type="button"
            className="flex-grow-1"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        )}
      </div>
    </Form>
  );
};

export default PersonasForm;
