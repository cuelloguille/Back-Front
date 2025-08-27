import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./register.css"; // estilos iguales al login

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      alert(res.data.message);
      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-background d-flex align-items-center justify-content-center">
      <div className="register-form-container p-4 shadow-lg rounded">
        <h1 className="text-center mb-4">Registro</h1>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-100 mb-3" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <div className="d-flex flex-column align-items-center gap-2">
          <p className="mb-1">
            ¿Ya tienes cuenta?{" "}
            <Button variant="link" onClick={() => navigate("/login")}>
              Ingresar
            </Button>
          </p>
          <p className="mb-0">
            
            <Button variant="secondary" onClick={() => navigate("/")}>
              <i className="bi bi-house-door me-2"></i> Home
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
