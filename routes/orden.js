const express = require("express");
const { verifyJwt } = require("../utils/helpers");
const orden = require("../controllers/orden");

const router = express.Router();

// GET
router.get("/api/orden", verifyJwt, orden.orden);
// router.get("/api/ordenes", orden.ordenes);
router.get("/api/mas_vendidos", orden.mas_vendidos);
router.get("/api/mis_compras", verifyJwt, orden.mis_compras);

// POST
router.post("/api/orden", verifyJwt, orden.nueva_orden);

// PUT

// DELETE

module.exports = router;
