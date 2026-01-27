const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { getProfile, logOut } = require("../controllers/user.controller");
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logOut);
module.exports = router;
