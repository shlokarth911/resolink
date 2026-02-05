const express = require("express");
const {
  createOrganisation,
  loginOrganisation,
  getOrganisationProfile,
  logoutOrganisation,
  getAllOrganisations,
} = require("../controllers/organisation.controller");
const {
  organisationAuthMiddleware,
  authMiddleware,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", createOrganisation);
router.post("/login", loginOrganisation);
router.post("/logout", organisationAuthMiddleware, logoutOrganisation);
router.get("/all", authMiddleware, getAllOrganisations);
router.get("/profile", organisationAuthMiddleware, getOrganisationProfile);

module.exports = router;
