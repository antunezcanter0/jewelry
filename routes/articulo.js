const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = require("../utils/multer");
const articulo = require("../controllers/articulo");

const upload = multer({ storage });
// const upload = multer({ dest: "../static/uploads/images1/" });

// GET
router.get("/api/articulos", articulo.articulos);
router.get("/api/articulo", articulo.articulo);
router.get("/api/articulo_x_producto", articulo.articulo_x_producto);
router.get("/api/suma_articulos", articulo.suma_articulos);
router.get("/api/articulos_en_oferta", articulo.articulos_en_oferta);
router.get("/api/articulos_mas_deseados", articulo.articulos_mas_deseados);
router.get("/api/articulos_nuevos", articulo.articulos_nuevos);
router.get("/api/ariculos_en", articulo.articulos_en);

// POST
router.post("/api/articulo", upload.single("image"), articulo.nuevo_articulo);
router.post("/api/inc_articulo_deseado", articulo.inc_articulo_deseado);

// PUT
router.put("/api/articulo", upload.single("image"), articulo.edita_articulo);

// DELETE
router.delete("/api/articulo/:id", articulo.elimina_articulo);

module.exports = router;
