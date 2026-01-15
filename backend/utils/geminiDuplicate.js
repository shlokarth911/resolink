const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const checkDuplicate = async (newIssue, existingIssues) => {
  if (existingIssues.length === 0) {
    return { isDuplicate: false };
  }

  const issuesText = existingIssues
    .map(
      (issue) => `
        ID: ${issue._id}
        Title: ${issue.title}
        Description: ${issue.description}
        `
    )
    .join("\n\n");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
    You are an AI system for detecting duplicate civic issues.
    Compare the NEW ISSUE with EXISTING ISSUES.
    Return ONLY valid JSON. No markdown. No explanation.
    Fields:
    - isDuplicate (true/false)
    - duplicateIssueId (or null)
    - confidence (0 to 1)
    NEW ISSUE:
    Title: ${newIssue.title}
    Description: ${newIssue.description}
    EXISTING ISSUES:
    ${issuesText}
    `,
  });

  const text = response?.text;

  const jsonStr = text.replace(/```json|```/g, "").trim();

  return JSON.parse(jsonStr);
};

module.exports = { checkDuplicate };
