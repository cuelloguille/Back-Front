import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // 👈 importa los estilos

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/login", { username, password });
      localStorage.setItem("token", res.data.token);
      alert("Login exitoso");
      navigate("/productos");
    } catch (err) {
      alert(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-form-container">
        <form onSubmit={handleLogin}>
          <h1 className="text-center">Iniciar sesión</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <p className="text-center mt-3">
            ¿No tienes cuenta? <a style={{ color: "white" }} href="/register">Registrarse</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
