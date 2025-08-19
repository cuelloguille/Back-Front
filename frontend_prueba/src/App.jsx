import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ProductosView from './components/Productos/ProductosView';
import PersonasView from './components/Personas/personasView';
import Login from './components/login/login';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="container-fluid mt-4 px-4">
        <nav className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink
                to="/productos"
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/personas"
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                Personas
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <ProductosView />
              </PrivateRoute>
            }
          />
          <Route
            path="/personas"
            element={
              <PrivateRoute>
                <PersonasView />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
