const express = require("express");
const router = express.Router();

const proveedor = require("../controllers/proveedor");

// GET
router.get("/api/proveedores", proveedor.proveedores);

// POST

// PUT

// DELETE

module.exports = router;
