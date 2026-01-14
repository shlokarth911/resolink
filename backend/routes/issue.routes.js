const express = require("express");
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssuesByOrganisation,
  getSortedIssues,
} = require("../controllers/issue.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getIssues);
router.get("/organisation/:id", authMiddleware, getIssuesByOrganisation);

router.get("/sorted", authMiddleware, getSortedIssues);

module.exports = router;
