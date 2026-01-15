const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateSolutions = async (issue) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
    You are an AI advisor helping organisations resolve issues.
    
    Analyze the issue and suggest solutions.
    
    Return ONLY valid JSON. No markdown. No explanations.
    
    Fields:
    - immediateActions (array of short strings)
    - longTermActions (array of short strings)
    - responsibleEntity (string)
    - estimatedResolutionTime (string)
    
    Issue:
    Title: ${issue.title}
    Description: ${issue.description}
    Category: ${issue.aiAnalysis?.category}
    Urgency: ${issue.aiAnalysis?.urgency}
    `,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response?.text;

  const jsonStr = text.replace(/```json|```/g, "").trim();

  return JSON.parse(jsonStr);
};

module.exports = {
  generateSolutions,
};
