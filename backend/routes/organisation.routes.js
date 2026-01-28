const express = require("express");
const {
  createOrganisation,
} = require("../controllers/organisation.controller");
const router = express.Router();

router.post("/register", createOrganisation);

module.exports = router;
