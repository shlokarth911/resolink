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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;
