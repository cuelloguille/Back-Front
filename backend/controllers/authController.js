const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  // Validación simple (en la realidad, buscar en DB)
  if (email === "admin@test.com" && password === "1234") {
    const token = jwt.sign({ email, rol: "admin" }, "secreto123", { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }
};

module.exports = { login };
