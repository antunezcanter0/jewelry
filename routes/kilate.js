const express = require("express");
const router = express.Router();

const kilate = require("../controllers/kilate");

// GET
router.get("/api/kilates", kilate.kilates);

// POST

// PUT

// DELETE

module.exports = router;
