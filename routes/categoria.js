const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../utils/multer");
const categoria = require("../controllers/categoria");

const upload = multer({ storage: storage });

// GET
router.get("/api/categorias", categoria.categorias);

// POST
router.post("/api/categoria", upload.single("image"), categoria.nueva_categoria);

// PUT
router.put("/api/categoria", upload.single("image"), categoria.edita_categoria);

// DELETE
router.delete("/api/categoria/:id", categoria.elimina_categoria);

module.exports = router;
