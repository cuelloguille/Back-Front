import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./login.css"; // estilos personalizados
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/login", { username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("username", res.data.user.username);

      toast.success("Login exitoso");
      navigate("/homeLogueado");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background d-flex align-items-center justify-content-center">
      <div className="login-form-container p-4 shadow-lg rounded">
        <h1 className="text-center mb-4">Iniciar sesión</h1>

        <form onSubmit={handleLogin}>
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
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
            <Form.Check
              type="checkbox"
              className="mt-2"
              label="Mostrar contraseña"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          </div>

          <Button type="submit" variant="primary" className="w-100 mb-3" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <div className="d-flex flex-column align-items-center gap-2">
          <p className="mb-1">
            ¿No tienes cuenta?{" "}
            <Button variant="link" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          </p>
          <p className="mb-0">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Home
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
