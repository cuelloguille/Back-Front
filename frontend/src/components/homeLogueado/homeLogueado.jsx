import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const goToProductos = () => navigate("/productos");
  const goToPersonas = () => navigate("/personas");

  return (
    <div className="home-background d-flex align-items-center justify-content-center">
      <div className="home-card text-center p-5 shadow-lg rounded">
        <h1 className="mb-3">¡Bienvenido!</h1>
        <h3 className="mb-3">Página de administración</h3>
        <p className="mb-4">
          Estás logueado como: <strong>{localStorage.getItem("username")}</strong>
        </p>
        <h5 className="mb-4">Puedes ingresar a las siguientes páginas:</h5>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button variant="primary" size="lg" onClick={goToProductos}>
            Ir a Productos
          </Button>
          <Button variant="success" size="lg" onClick={goToPersonas}>
            Ir a Personas
          </Button>
        </div>
      </div>
    </div>
  );
}
