import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ProductosView from './components/Productos/ProductosView';
import PersonasView from './components/Personas/personasView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container-fluid mt-4 px-4">
        <nav className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/personas"
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                Personas
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/productos" element={<ProductosView />} />
          <Route path="/personas" element={<PersonasView />} />
          <Route path="*" element={<ProductosView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
