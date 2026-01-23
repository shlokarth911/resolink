const Issue = require("../models/Issue");
const { createIssue } = require("../services/issue.service");
const { analyzeIssue } = require("../utils/gemini");
const { checkDuplicate } = require("../utils/geminiDuplicate");
const { generateSolutions } = require("../utils/geminiSolutions");

module.exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, organisationId, isAnonymous } =
      req.body;

    // 1️⃣ Fetch recent issues of same organisation
    const recentIssues = await Issue.find({
      organisation: organisationId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    // 2️⃣ Ask Gemini if duplicate
    const duplicateResult = await checkDuplicate(
      { title, description },
      recentIssues,
    );

    // 3️⃣ If duplicate → link instead of create new root issue
    if (duplicateResult.isDuplicate && duplicateResult.confidence > 0.7) {
      const originalIssue = await Issue.findById(
        duplicateResult.duplicateIssueId,
      );

      if (originalIssue) {
        originalIssue.votes += 1;
        originalIssue.priorityScore += 1;
        await originalIssue.save();

        return res.status(200).json({
          message: "Duplicate issue detected",
          duplicateOf: originalIssue._id,
          confidence: duplicateResult.confidence,
        });
      }
    }

    // 4️⃣ If not duplicate → AI Analysis & Creation
    const aiData = await analyzeIssue(title, description);

    const aiSolutions = await generateSolutions({
      title,
      description,
      aiAnalysis: aiData,
    });

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
      aiSolutions,
      priorityScore: priorityMap[aiData.urgency] || 1,
    });

    return res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
