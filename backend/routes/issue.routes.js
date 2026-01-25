const express = require("express");
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssuesByOrganisation,
  getSortedIssues,
  getIssuesByUser,
} = require("../controllers/issue.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getIssues);
router.get("/user", authMiddleware, getIssuesByUser);
router.get("/organisation/:id", authMiddleware, getIssuesByOrganisation);

router.get("/sorted", authMiddleware, getSortedIssues);

module.exports = router;
