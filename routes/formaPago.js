const express = require("express");
const router = express.Router();

const formaPago = require("../controllers/formaPago");

// GET
router.get("/api/formas_pago", formaPago.formas_pago);

// POST

// PUT

// DELETE

module.exports = router