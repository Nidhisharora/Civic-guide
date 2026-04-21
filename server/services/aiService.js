const axios = require("axios");
const { retrieveRelevantDocs } = require("./ragService");

const OLLAMA_URL = "http://localhost:11434/api/generate";

/**
 * 🔹 Chat with RAG (for user queries)
 */
const getAIResponse = async (query) => {
  const docs = await retrieveRelevantDocs(query);
  const context = docs.map(doc => doc.content).join("\n\n");

  const prompt = `
You are CivicGuide AI.

Use ONLY the context below to answer.

Respond in this format:

✅ Process Name

📌 Steps:
1.
2.
3.

📄 Required Documents:
- item
- item

💰 Fees:
Mention if available else "Not specified"

🌐 Official Portal:
Provide official link only

Context:
${context}

Question:
${query}
`;

  try {
    const response = await axios.post(OLLAMA_URL, {
      model: "gemma4:e4b",
      prompt: prompt,
      stream: false
    });

    return response.data.response;

  } catch (error) {
    console.error("AI Chat Error:", error.message);
    return "Local AI failed.";
  }
};

/**
 * 🔹 OCR + AI Document Analysis
 */
const analyzeDocument = async (ocrText) => {
  const prompt = `
You are CivicGuide AI.

A user uploaded a government document.
The OCR text may be noisy or incorrect.

Your job:
- Understand the document
- Extract correct information even if text is messy

Respond STRICTLY in this format:

📄 Document Type:
(Aadhaar / PAN / etc)

👤 Extracted Details:
- Name:
- DOB:
- ID Number:

🧠 Purpose:
Explain in simple words what this document is used for



IMPORTANT:
- Ignore OCR mistakes
- Do NOT guess randomly
- If something is unclear, write "Not clearly visible"

Document Text:
${ocrText}
`;

  try {
    const response = await axios.post(OLLAMA_URL, {
      model: "gemma4:e4b",
      prompt: prompt,
      stream: false
    });

    return response.data.response;

  } catch (error) {
    console.error("AI OCR Error:", error.message);
    return "Document analysis failed.";
  }
};

module.exports = {
  getAIResponse,
  analyzeDocument
};