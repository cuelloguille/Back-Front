import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./register.css"; // estilos personalizados (igual que login)

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/register", {
        username,
        password,
        role,
      });

      toast.success(`Usuario ${res.data.username} registrado con éxito `);

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");

      navigate("/login"); // 
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al registrarse ");
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
              placeholder="Ingrese un usuario"
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
              placeholder="Ingrese una contraseña"
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

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme la contraseña"
              required
            />
          </div>

          
          <Button type="submit" variant="success" className="w-100 mb-3" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <div className="d-flex flex-column align-items-center gap-2">
          <p className="mb-1">
            ¿Ya tienes cuenta?{" "}
            <Button variant="link" onClick={() => navigate("/login")}>
              Iniciar sesión
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

