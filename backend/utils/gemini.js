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

  if (!text) {
    return {
      category: "Uncategorized",
      urgency: "medium",
      summary: "Analysis failed",
      sentimentScore: 0,
    };
  }

  const jsonStr = text.replace(/```json|```/g, "").trim();

  return JSON.parse(jsonStr);
};

const fs = require("fs");
const path = require("path");
const os = require("os");

const verifyIssueImage = async (imageBuffer, mimeType = "image/jpeg") => {
  const model = "gemini-3-flash-preview"; // Using a known valid model, user can change if needed

  // 1. Create a temporary file
  const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}.jpg`);
  const buffer = Buffer.from(imageBuffer, "base64");
  fs.writeFileSync(tempFilePath, buffer);

  try {
    // 2. Upload the file using the Files API
    const uploadResult = await ai.files.upload({
      file: tempFilePath,
      config: { mimeType: mimeType },
    });

    console.log("Uploaded file URI:", uploadResult.uri);

    const prompt = `
        You are an AI assistant for a civic issue platform. 
        Analyze the provided image of an infrastructure issue (e.g., pothole, garbage, broken street light).

        Return JSON ONLY with the following fields:
        - isLegitimate (boolean): Is this a valid civic issue? (e.g., a pothole is valid, a selfie is not).
        - damageType (string): Type of damage (e.g., "Pothole", "Water Leak").
        - severity (number): 1 to 10 scale (10 is critical).
        - safetyRisk (string): Description of safety risk.
        - repairCostEstimate (string): Estimated cost range (e.g., "$100 - $300").
        - reasoning (string): Brief explanation of your analysis.
    `;

    // 3. Generate content using the file URI
    const result = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              fileData: {
                fileUri: uploadResult.uri,
                mimeType: uploadResult.mimeType,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    console.log("Gemini Raw Result:", JSON.stringify(result, null, 2));

    const candidateText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    const text =
      candidateText ||
      (typeof result?.text === "function" ? result.text() : result?.text);

    if (!text) {
      console.warn("Gemini returned empty response for verification.");
      return { isLegitimate: false, reasoning: "AI failed to analyze image." };
    }

    // specific robust JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;

    try {
      return JSON.parse(jsonStr);
    } catch (err) {
      console.error("Failed to parse Gemini verification JSON:", err);
      return { isLegitimate: false, reasoning: "AI response format error." };
    }
  } catch (error) {
    console.error("Error in verifyIssueImage:", error);
    return {
      isLegitimate: false,
      reasoning: `Internal Error: ${error.message}`,
    };
  } finally {
    // 4. Cleanup temp file
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};

module.exports = { analyzeIssue, verifyIssueImage };
