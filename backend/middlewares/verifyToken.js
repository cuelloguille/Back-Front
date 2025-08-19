const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]; // Espera "Bearer <token>"

  if (!token) {
    return res.status(403).json({ mensaje: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secreto123");
    req.user = decoded; // guardamos info del usuario
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}

module.exports = verifyToken;
