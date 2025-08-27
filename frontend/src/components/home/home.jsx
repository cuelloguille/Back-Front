import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-background">
      <div className="home-card">
        <h1 className="mb-3">Bienvenido</h1>
        <h3 className="mb-3">Página de administración</h3>
        <p className="mb-4">
          Para ingresar al sistema de administración debes iniciar sesión.
        </p>
        <Button variant="light" size="lg" onClick={goToLogin}>
          Ir al Login
        </Button>
      </div>
    </div>
  );
}
