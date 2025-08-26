const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const archivo = path.join(__dirname, "../data/usuarios.json");

const getUsuarios = () => {
  try {
    const data = fs.readFileSync(archivo, "utf8") || "[]";
    return JSON.parse(data);
  } catch {
    return [];
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const usuarios = getUsuarios();

  const usuario = usuarios.find(u => u.username === username);
  if (!usuario) return res.status(401).json({ error: "Usuario o contraseña incorrectos" });

  const passwordCorrecta = await bcrypt.compare(password, usuario.password);
  if (!passwordCorrecta) return res.status(401).json({ error: "Usuario o contraseña incorrectos" });

  const token = jwt.sign(
    { id: usuario.id, username: usuario.username, role: usuario.role },
    "secreto123",
    { expiresIn: "1h" }
  );

res.json({
  token,
  user: {
    id: usuario.id,
    username: usuario.username,
    role: usuario.role
  }
});
};
