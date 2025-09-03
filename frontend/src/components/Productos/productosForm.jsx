import React from "react";
import { Form, Button } from "react-bootstrap";

const ProductosForm = ({ form, setForm, handleSubmit, editId, handleCancel }) => {
  return (
    <Form
      onSubmit={handleSubmit}
      className="p-4 rounded shadow-sm d-flex flex-column align-items-center"
      style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "#2c2c2c",
        color: "#f0f0f0",
      }}
    >
      {/* Nombre */}
      <Form.Group className="mb-3 w-100" controlId="nombre">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          style={{
            backgroundColor: "#1f1f1f",
            color: "#f0f0f0",
            borderColor: "#444",
          }}
        />
      </Form.Group>

      {/* Precio */}
      <Form.Group className="mb-3 w-100" controlId="precio">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
          min="0"
          step="0.01"
          style={{
            backgroundColor: "#1f1f1f",
            color: "#f0f0f0",
            borderColor: "#444",
          }}
        />
      </Form.Group>

      {/* Stock */}
      <Form.Group className="mb-3 w-100" controlId="stock">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese stock disponible"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
          min="0"
          style={{
            backgroundColor: "#1f1f1f",
            color: "#f0f0f0",
            borderColor: "#444",
          }}
        />
      </Form.Group>

      {/* Descripción */}
      <Form.Group className="mb-3 w-100" controlId="descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Ingrese una descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          style={{
            backgroundColor: "#1f1f1f",
            color: "#f0f0f0",
            borderColor: "#444",
          }}
        />
      </Form.Group>

      {/* Botones */}
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

export default ProductosForm;
