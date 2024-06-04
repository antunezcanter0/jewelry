const express = require("express");
const router = express.Router();

const estadoOrden = require("../controllers/estadoOrden");

// GET
router.get("/api/estados_ordenes", estadoOrden.estados_ordenes);

// POST

// PUT

// DELETE

module.exports = router;
