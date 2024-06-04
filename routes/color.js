const express = require("express");
const router = express.Router();

const color = require("../controllers/color");

// GET
router.get("/api/colores", color.colores);

// POST

// PUT

// DELETE

module.exports = router;
