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
      <Form.Group className="mb-3 w-100" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={{ backgroundColor: "#2c2c2c", color: "#f0f0f0", border: "1px solid #444" }}
        />
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="role">
        <Form.Label>Rol</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese rol"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
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

