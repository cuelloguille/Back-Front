// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // Si hay token, redirige a productos
  if (token) {
    return <Navigate to="/productos" replace />;
  }

  // Si no hay token, renderiza la ruta "hija"
  return <Outlet />;
};

export default PublicRoute;
