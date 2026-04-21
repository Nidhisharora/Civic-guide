const axios = require("axios");
const { retrieveRelevantDocs } = require("./ragService");

const OLLAMA_URL = "http://localhost:11434/api/generate";

/**
 * 🔹 Chat with RAG (for user queries)
 */
const getAIResponse = async (query) => {
  const docs = await retrieveRelevantDocs(query);
  const context = docs.map(doc => doc.content).join("\n\n");
const getAIResponse = async (query) => {
  try {
    // 🔥 Step 1: Basic relevance filter
    const governmentKeywords = [
      "passport",
      "pan",
      "aadhaar",
      "aadhar",
      "driving",
      "license",
      "licence",
      "ration",
      "voter",
      "certificate",
      "scheme",
      "income",
      "caste",
      "domicile",
      "government",
      "id card"
    ];

    const isRelevant = governmentKeywords.some((word) =>
      query.toLowerCase().includes(word)
    );

    if (!isRelevant) {
      return "I couldn't find relevant government information.";
    }

    // 🔥 Step 2: Retrieve docs
    const docs = await retrieveRelevantDocs(query);

    if (!docs || docs.length === 0) {
      return "I couldn't find relevant government information.";
    }

    const context = docs.map((doc) => doc.content).join("\n\n");

    // 🔥 Step 3: Strong prompt
    const prompt = `
You are CivicGuide AI.

Use ONLY the context below to answer.
STRICT RULES:

1. Answer ONLY using the context below.
2. If query is unrelated to government services, reply EXACTLY:
I couldn't find relevant government information.
3. If answer is not in context, reply EXACTLY:
I couldn't find relevant government information.

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
official link only

Keep answer clean, short and readable.

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
    // 🔥 Step 4: Ollama local Gemma
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "gemma2:2b",
        prompt: prompt,
        stream: false
      }
    );

    return response.data.response.trim();

  } catch (error) {
    console.log(error.response?.data || error.message);
    return "Local AI service unavailable.";
  }
};

module.exports = {
  getAIResponse,
  analyzeDocument
};