import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import ProductosView from "./components/Productos/ProductosView";
import PersonasView from "./components/Personas/personasView";
import Login from "./components/login/login";
import Register from "./components/register/register"; // 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Componente para rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// Layout con Navbar (solo se muestra si estás logueado)
function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid mt-4 px-4" style={{ minHeight: "100vh" }}>
      <nav className="mb-4 d-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/personas"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Personas
            </NavLink>
          </li>
        </ul>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>
      <Outlet /> {/* Aquí se renderizan las vistas hijas */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/*  */}

        {/* Rutas privadas con Layout */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/productos" element={<ProductosView />} />
          <Route path="/personas" element={<PersonasView />} />
        </Route>

        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

