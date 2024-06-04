const express = require("express");
const router = express.Router();

const authUser = require("../controllers/authUser");
const { verifyJwt } = require("../utils/helpers");

// GET
router.get("/api/auth_users", authUser.users);
router.get("/api/auth_user", verifyJwt, authUser.user);
router.get("/api/auth_groups", authUser.groups);
router.get("/api/lost_password", authUser.lost_password);

// POST
router.post("/api/auth_register", authUser.register);
router.post("/api/auth_login", authUser.login, (req, res) => {
  res.status(200).send(req.user);
});
router.post("/api/auth_profile", verifyJwt, authUser.profile);

// PUT
router.put("/api/auth_user/:id", verifyJwt, authUser.user);
router.put("/api/change_password/:email", authUser.change_password);

// DELETE

module.exports = router;
