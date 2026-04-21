import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
import OCRUpload from "../components/OCRUpload";
import SchemeChecker from "../components/SchemeChecker/SchemeChecker";

const Home = () => {
  const scrollToDemo = () => {
    document.getElementById("demo").scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-slate-950 text-white min-h-screen overflow-hidden">

      <div className="glow-ball absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="glow-ball absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="pointer-events-none absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      <Navbar scrollToDemo={scrollToDemo} />

      {/* HERO */}
      <section className="fade-up text-center px-6 py-28 max-w-6xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Simplifying{" "}
          <span className="text-cyan-400 drop-shadow-lg">
            Government Services
          </span>{" "}
          with AI
        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-10">
          Get instant help with forms, schemes, applications and document verification.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={scrollToDemo}
            className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition px-7 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30"
          >
            Try Demo
          </button>

        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="fade-up px-6 py-20 max-w-7xl mx-auto relative z-10"
      >
        <h2 className="text-4xl font-bold text-center mb-14">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              icon: "🤖",
              title: "AI Assistant",
              desc: "Ask any government related question instantly.",
            },
            {
              icon: "📑",
              title: "Scheme Finder",
              desc: "Find government schemes you are eligible for.",
            },
            {
              icon: "📷",
              title: "OCR Verification",
              desc: "Upload and verify official documents instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl hover:-translate-y-3 hover:shadow-xl hover:shadow-cyan-500/10 transition duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* DEMO */}
      <section
        id="demo"
        className="fade-up px-6 py-24 max-w-7xl mx-auto relative z-10"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Live Demo
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-start">

          {/* Card 1 — AI Chat (unchanged) */}
          <ChatBot />

          {/* Card 2 — Scheme Checker (NEW card wrapper) */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 overflow-y-auto max-h-[620px]">
            <h3 className="text-xl font-bold text-white mb-1">
              Scheme Eligibility Checker
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Find government schemes you qualify for.
            </p>
            <SchemeChecker />
          </div>

          {/* Card 3 — OCR (unchanged) */}
          <OCRUpload />

        </div>
      </section>


      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 border-t border-slate-800">
        © 2026 CivicGuide AI • Built by{" "}
        <span className="text-cyan-400 font-semibold">
          qu4ntum_v01d
        </span>
        <span className="text-pink-500"> ❤</span>
      </footer>

    </div>
  );
};

export default Home;