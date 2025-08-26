// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // Si no hay token, redirige a login
  if (!token) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  // Si hay token, renderiza la ruta "hija"
  return <Outlet />;
};

export default PrivateRoute;
