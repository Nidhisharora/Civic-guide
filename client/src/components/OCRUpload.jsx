import { useState } from "react";
import axios from "axios";

const OCRUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/ocr/upload",
        formData
      );

      setData(res.data);

    } catch (error) {
      console.error(error);
      alert("OCR failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white max-w-xl">
      <h2 className="text-2xl font-bold mb-3">OCR Verification</h2>
      <p className="text-gray-400 mb-4">
        Upload and verify your documents instantly.
      </p>

      {/* File Input */}
      <label className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
        <span className="text-gray-400">
          {file ? file.name : "Click to choose file"}
        </span>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition"
      >
        {loading ? "Processing..." : "Upload Document"}
      </button>

      {/* Loading Bar */}
      {loading && (
        <div className="w-full bg-gray-700 rounded mt-3">
          <div className="h-2 bg-blue-500 animate-pulse rounded w-full"></div>
        </div>
      )}

      {/* RESULT SECTION */}
      {data && (
        <div className="mt-6">

          {/* RAW TEXT */}
          {/* <h3 className="font-bold">Extracted Text:</h3>
          <pre className="bg-slate-800 p-3 rounded mt-2 max-h-60 overflow-auto whitespace-pre-wrap">
            {data.rawText}
          </pre> */}

          {/* AI ANALYSIS */}
          {data.aiAnalysis && (
            <div className="mt-6">
              <h3 className="font-bold">AI Analysis:</h3>
              <pre className="bg-slate-800 p-3 rounded mt-2 whitespace-pre-wrap">
                {data.aiAnalysis}
              </pre>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default OCRUpload;