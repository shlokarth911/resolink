const Issue = require("../models/Issue");
const { createIssue } = require("../services/issue.service");
const { analyzeIssue } = require("../utils/gemini");

module.exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, organisationId, isAnonymous } =
      req.body;

    const aiData = await analyzeIssue(title, description);

    const priorityMap = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4,
    };

    const issue = await createIssue({
      title,
      description,
      category: aiData.category || category?.trim() || null,
      organisation: organisationId,
      postedBy: isAnonymous ? null : req.user.id,
      isAnonymous: isAnonymous || false,
      aiAnalysis: aiData,
      priorityScore: priorityMap[aiData.urgency] || 1,
    });

    return res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create issue",
      error: error.message,
    });
  }
};

module.exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("organisation", "name type")
      .populate("postedBy", "name");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getIssuesByOrganisation = async (req, res) => {
  try {
    const issues = await Issue.find({
      organisation: req.params.id,
    }).sort({ votes: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSortedIssues = async (req, res) => {
  const issues = await Issue.find().sort({
    priorityScore: -1,
    votes: -1,
    createdAt: -1,
  });

  res.json(issues);
};
