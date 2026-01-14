const Issue = require("../models/Issue");

module.exports.createIssue = async (issueData) => {
  try {
    const issue = await Issue.create(issueData);
    return issue;
  } catch (error) {
    throw error;
  }
};
