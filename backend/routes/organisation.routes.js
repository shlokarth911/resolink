const express = require("express");
const {
  createOrganisation,
  loginOrganisation,
  getOrganisationProfile,
  logoutOrganisation,
} = require("../controllers/organisation.controller");
const {
  organisationAuthMiddleware,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", createOrganisation);
router.post("/login", loginOrganisation);
router.post("/logout", organisationAuthMiddleware, logoutOrganisation);
router.get("/profile", organisationAuthMiddleware, getOrganisationProfile);

module.exports = router;
