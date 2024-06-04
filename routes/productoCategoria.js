const express = require("express");
const router = express.Router();
const productoCategoria = require("../controllers/productoCategoria");

// GET
router.get("/api/productos_categorias", productoCategoria.productos_categorias);
router.get("/api/productos_x_categoria", productoCategoria.productos_x_categoria);

// POST

// PUT

// DELETE

module.exports = router;
