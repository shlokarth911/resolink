const express = require("express");
const {
  register,
  login,
  registerAnonymousUser,
  upgradeToUser,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/anonymous", registerAnonymousUser);
router.post("/upgrade", upgradeToUser);

module.exports = router;
