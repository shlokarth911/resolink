const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },

  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  isAnonymous: {
    type: Boolean,
    default: false,
  },

  votes: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["open", "in_progress", "resolved"],
    default: "open",
  },

  aiAnalysis: {
    category: String,
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
    },
    summary: String,
    sentimentScore: Number,
  },

  priorityScore: {
    type: Number,
    default: 0,
  },

  isDuplicate: {
    type: Boolean,
    default: false,
  },

  duplicateOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
  },

  duplicateConfidence: {
    type: Number, // 0 to 1
  },

  aiSolutions: {
    immediateActions: [String],
    longTermActions: [String],
    responsibleEntity: String,
    estimatedResolutionTime: String,
  },

  attachments: [String], // Array of Base64 strings or URLs

  verificationResult: {
    isLegitimate: Boolean,
    damageType: String,
    severity: Number,
    safetyRisk: String,
    repairCostEstimate: String,
    reasoning: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;
