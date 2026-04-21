const { extractTextFromImage } = require("../services/ocrService");

/**
 * Handle document upload and OCR processing
 */
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const filePath = req.file.path;

    const result = await extractTextFromImage(filePath);

    res.status(200).json({
      success: true,
      rawText: result.rawText,
      aiAnalysis: result.aiAnalysis
    });

  } catch (error) {
    console.error("OCR Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "OCR + AI processing failed"
    });
  }
};

module.exports = { uploadDocument };