// routes/login.js
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginControllers"); // 👈 controlador correcto

// POST /login
router.post("/login", login);

module.exports = router;
