const jwt = require("jsonwebtoken");

// Verifica que exista un token y sea válido
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, "secreto123"); // mejor poner secreto en .env
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
};

// Verifica que el usuario sea admin
const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Token requerido" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Acceso denegado" });
  next();
};

module.exports = { verifyToken, isAdmin };
