import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import ProductosView from "./components/Productos/ProductosView";
import PersonasView from "./components/Personas/personasView";
import Login from "./components/login/login";
import Register from "./components/register/register";
import HomeLogueado from "./components/homeLogueado/homeLogueado";
import Home from "./components/home/home";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// ✅ Importar Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente para rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// Componente para rutas públicas
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/homeLogueado" replace /> : children;
}

// Layout con Navbar (solo se muestra si estás logueado)
function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.info("Sesión cerrada 👋"); // ✅ ahora usa toast en vez de alert
    navigate("/login");
  };

  return (
    <div className="container-fluid mt-4 px-4" style={{ minHeight: "100vh" }}>
      <nav className="mb-4 d-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink
              to="/productos"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/personas"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Personas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/homeLogueado"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Home
            </NavLink>
          </li>
        </ul>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>
      <Outlet /> {/* Renderiza las vistas hijas */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute><Outlet /></PublicRoute>}>
          <Route path="/" element={<Home />} />   
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/homeLogueado" element={<HomeLogueado />} /> {/* Home privado */}
          <Route path="/productos" element={<ProductosView />} />
          <Route path="/personas" element={<PersonasView />} />
        </Route>

        {/* Redirección para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ Contenedor de notificaciones global */}
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </Router>
  );
}

export default App;
