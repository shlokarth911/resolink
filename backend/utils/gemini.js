const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const analyzeIssue = async (title, description) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
        You are an AI assistant for a civic issue platform.

        Analyze the following issue and return JSON ONLY.

        Fields:
        - category (single word)
        - urgency (low, medium, high, critical)
        - summary (max 20 words)
        - sentimentScore (number between -1 and 1)

        Issue:
        Title: ${title}
        Description: ${description}
      `,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response?.text;

  const jsonStr = text.replace(/```json|```/g, "").trim();

  return JSON.parse(jsonStr);
};

module.exports = { analyzeIssue };
