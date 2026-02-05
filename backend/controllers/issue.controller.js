const Issue = require("../models/Issue");
const { createIssue } = require("../services/issue.service");
const { analyzeIssue } = require("../utils/gemini");
const { checkDuplicate } = require("../utils/geminiDuplicate");
const { generateSolutions } = require("../utils/geminiSolutions");
const User = require("../models/User");
const Organisation = require("../models/Organisation");

const jwt = require("jsonwebtoken");

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
    console.log("AI Analysis Result:", aiData);

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
      postedBy: req.user.id,
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

    const sanitizedIssues = issues.map((issue) => {
      const issueObj = issue.toObject();
      if (issueObj.isAnonymous) {
        issueObj.postedBy = null;
      }
      return issueObj;
    });

    res.json(sanitizedIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getIssuesByUser = async (req, res) => {
  try {
    const issues = await Issue.find({
      postedBy: req.user.id,
    })
      .sort({ votes: -1 })
      .lean();

    res.json(issues);
  } catch (error) {
    console.error("Error in getIssuesByUser:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getIssuesByOrganisation = async (req, res) => {
  try {
    const issues = await Issue.find({
      organisation: req.params.id,
    }).sort({ votes: -1 });

    const sanitizedIssues = issues.map((issue) => {
      const issueObj = issue.toObject();
      if (issueObj.isAnonymous) {
        issueObj.postedBy = null;
      }
      return issueObj;
    });

    res.json(sanitizedIssues);
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

  const sanitizedIssues = issues.map((issue) => {
    const issueObj = issue.toObject();
    if (issueObj.isAnonymous) {
      issueObj.postedBy = null;
    }
    return issueObj;
  });

  res.json(sanitizedIssues);
};

module.exports.upVote = async (req, res) => {
  try {
    const { issueId } = req.body;

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.votes += 1;
    await issue.save();

    res.json({ message: "Issue upvoted successfully", issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIssueFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      status: { $ne: "resolved" },
    };

    // Optional category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const issues = await Issue.find(filter)
      .select(
        "title category votes status description isAnonymous aiAnalysis.urgency aiAnalysis.summary createdAt",
      )
      .sort({
        priorityScore: -1,
        votes: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      page,
      count: issues.length,
      issues,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch issue feed" });
  }
};

module.exports.getOrganisationIssues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, urgency, sortBy } = req.query;

    const organisation = await Organisation.findById(req.organisation.id);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }

    // Build Query
    const query = { organisation: organisation._id };
    if (status && status !== "all") {
      query.status = status;
    }
    if (urgency && urgency !== "all") {
      query["aiAnalysis.urgency"] = urgency;
    }

    // Determine Sort Order
    let sortOptions = { createdAt: -1 }; // Default: Newest first
    if (sortBy === "priority") {
      sortOptions = { priorityScore: -1, createdAt: -1 };
    } else if (sortBy === "votes") {
      sortOptions = { votes: -1, createdAt: -1 };
    }

    const totalIssues = await Issue.countDocuments(query); // Total count for frontend to know when to stop

    const issues = await Issue.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Issues fetched successfully",
      issues,
      page,
      totalPages: Math.ceil(totalIssues / limit),
      totalIssues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
      error: error.message,
    });
  }
};

module.exports.setIssueStatus = async (req, res) => {
  try {
    const { issueId, status } = req.body;
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    issue.status = status;
    await issue.save();
    return res.status(200).json({
      success: true,
      message: "Issue status updated successfully",
      issue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update issue status",
      error: error.message,
    });
  }
};
