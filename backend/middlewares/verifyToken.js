const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // 🔹 siempre minúscula
  if (!authHeader) {
    return res.status(403).json({ mensaje: "Token requerido" });
  }

  const token = authHeader.split(" ")[1]; // 🔹 extraer token
  if (!token) return res.status(403).json({ mensaje: "Token requerido" });

  try {
    const decoded = jwt.verify(token, "secreto123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}

module.exports = verifyToken;
