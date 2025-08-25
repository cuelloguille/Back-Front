import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; // 👈 estilos iguales al login

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
    <div className="register-background">
      <div className="register-form-container">
        <form onSubmit={handleRegister}>
          <h1 className="text-center">Registro</h1>
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <p className="text-center mt-3 text-white">
            ¿Ya tienes cuenta? <a href="/login" className="text-white">Ingresar</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
