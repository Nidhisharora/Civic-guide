import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        query,
      });

      setResponse(res.data.answer);
    } catch (error) {
      setResponse("❌ Failed to get response.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg min-h-[450px]">
      <h2 className="text-3xl font-bold mb-5">AI Chat Assistant</h2>

      <input
        type="text"
        placeholder="Ask any government question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
      />

      <button
        onClick={handleAsk}
        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="mt-5 bg-slate-800 p-4 rounded-xl whitespace-pre-line leading-7 text-sm text-gray-100 border border-slate-700">
          <div className="whitespace-pre-line">
            {response.split(" ").map((word, index) => {
              if (word.startsWith("http")) {
                return (
                  <a
                    key={index}
                    href={word}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline break-all"
                  >
                    {word}{" "}
                  </a>
                );
              }
              return word + " ";
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;