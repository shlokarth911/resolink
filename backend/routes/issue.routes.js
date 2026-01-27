const express = require("express");
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssuesByOrganisation,
  getSortedIssues,
  getIssuesByUser,
  upVote,
  getIssueFeed,
} = require("../controllers/issue.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getIssues);
router.get("/user", authMiddleware, getIssuesByUser);
router.get("/organisation/:id", authMiddleware, getIssuesByOrganisation);

router.get("/sorted", authMiddleware, getSortedIssues);
router.post("/upvote", authMiddleware, upVote);
router.get("/feed", authMiddleware, getIssueFeed);

module.exports = router;
