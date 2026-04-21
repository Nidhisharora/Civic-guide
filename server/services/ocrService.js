const Tesseract = require("tesseract.js");
const { analyzeDocument } = require("./aiService");

/**
 * OCR + AI pipeline
 */
const extractTextFromImage = async (imagePath) => {
  try {
    // Step 1: OCR
    const result = await Tesseract.recognize(imagePath, "eng");
    const rawText = result.data.text;

    // Step 2: AI Analysis (Gemma via Ollama)
    const aiResponse = await analyzeDocument(rawText);

    return {
      rawText,
      aiAnalysis: aiResponse
    };

  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to process document");
  }
};

module.exports = { extractTextFromImage };