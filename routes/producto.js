const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../utils/multer");
const producto = require("../controllers/producto");

const upload = multer({ storage: storage });

// GET
router.get("/api/productos", producto.productos);
router.get("/api/producto", producto.producto);

// POST
router.post("/api/producto", upload.single("image"), producto.nuevo_producto);
router.put("/api/producto", upload.single("image"), producto.edita_producto);

// PUT

// DELETE
router.delete("/api/producto/:id", producto.elimina_producto);

module.exports = router;
