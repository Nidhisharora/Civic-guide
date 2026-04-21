// client/src/components/SchemeChecker/SchemeChecker.jsx
import { useState } from "react";
import { SCHEMES } from "../../data/schemeData";

const INITIAL_FORM = {
  age: "",
  gender: "",
  income: "",
  occupation: "",
  state: "",
  category: "",
  bpl: false,
  disabled: false,
  pregnant: false,
  nohouse: false,
  nobank: false,
};

export default function SchemeChecker() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [results, setResults] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const checkEligibility = () => {
    setLoading(true);
    const f = {
      ...form,
      income: parseFloat(form.income) || 9999999,
      age: parseInt(form.age) || 0,
    };
    setTimeout(() => {
      const eligible = [];
      const maybe = [];
      SCHEMES.forEach((s) => {
        const r = s.check(f);
        if (r === "eligible") eligible.push(s);
        else if (r === "maybe") maybe.push(s);
      });
      setResults({ eligible, maybe });
      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setResults(null);
    setExpandedId(null);
  };

  const inputClass =
    "w-full bg-slate-800 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700 transition-all";

  const labelClass = "block text-xs text-gray-400 uppercase tracking-wider mb-1.5 font-medium";

  return (
    <div className="w-full text-gray-200">

      {/* ───────── FORM ───────── */}
      {!results && (
        <div>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Enter your details below — we'll instantly match you to real government schemes you qualify for.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Age */}
            <div>
              <label className={labelClass}>Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 28"
                className={inputClass}
              />
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className={inputClass} style={{colorScheme:"dark"}}>
                <option value="" className="bg-slate-800 text-white">Select gender</option>
                <option className="bg-slate-800 text-white">Male</option>
                <option className="bg-slate-800 text-white">Female</option>
                <option className="bg-slate-800 text-white">Other</option>
              </select>
            </div>

            {/* Income */}
            <div>
              <label className={labelClass}>Annual Income (₹)</label>
              <input
                type="number"
                name="income"
                value={form.income}
                onChange={handleChange}
                placeholder="e.g. 180000"
                className={inputClass}
              />
            </div>

            {/* Occupation */}
            <div>
              <label className={labelClass}>Occupation</label>
              <select name="occupation" value={form.occupation} onChange={handleChange} className={inputClass} style={{colorScheme:"dark"}}>
                <option value="" className="bg-slate-800 text-white">Select occupation</option>
                <option className="bg-slate-800 text-white">Student</option>
                <option className="bg-slate-800 text-white">Farmer</option>
                <option className="bg-slate-800 text-white">Self-employed / Business</option>
                <option className="bg-slate-800 text-white">Salaried (Private)</option>
                <option className="bg-slate-800 text-white">Salaried (Govt)</option>
                <option className="bg-slate-800 text-white">Daily Wage / Labourer</option>
                <option className="bg-slate-800 text-white">Unemployed</option>
                <option className="bg-slate-800 text-white">Senior Citizen (Retired)</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className={labelClass}>State</label>
              <select name="state" value={form.state} onChange={handleChange} className={inputClass} style={{colorScheme:"dark"}}>
                <option value="" className="bg-slate-800 text-white">Select state</option>
                <option className="bg-slate-800 text-white">Punjab</option>
                <option className="bg-slate-800 text-white">Haryana</option>
                <option className="bg-slate-800 text-white">Uttar Pradesh</option>
                <option className="bg-slate-800 text-white">Bihar</option>
                <option className="bg-slate-800 text-white">Rajasthan</option>
                <option className="bg-slate-800 text-white">Maharashtra</option>
                <option className="bg-slate-800 text-white">West Bengal</option>
                <option className="bg-slate-800 text-white">Madhya Pradesh</option>
                <option className="bg-slate-800 text-white">Tamil Nadu</option>
                <option className="bg-slate-800 text-white">Andhra Pradesh</option>
                <option className="bg-slate-800 text-white">Gujarat</option>
                <option className="bg-slate-800 text-white">Other</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass} style={{colorScheme:"dark"}}>
                <option value="" className="bg-slate-800 text-white">Select category</option>
                <option className="bg-slate-800 text-white">General</option>
                <option className="bg-slate-800 text-white">OBC</option>
                <option className="bg-slate-800 text-white">SC</option>
                <option className="bg-slate-800 text-white">ST</option>
                <option className="bg-slate-800 text-white">EWS</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mb-4">
            <label className={labelClass}>Additional Details</label>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "bpl", label: "BPL card holder" },
                { name: "disabled", label: "Disability" },
                { name: "pregnant", label: "Pregnant / new mother" },
                { name: "nohouse", label: "No pucca house" },
                { name: "nobank", label: "No bank account" },
              ].map((cb) => (
                <label
                  key={cb.name}
                  className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
                >
                  <input
                    type="checkbox"
                    name={cb.name}
                    checked={form[cb.name]}
                    onChange={handleChange}
                    className="accent-cyan-400 w-3.5 h-3.5"
                  />
                  {cb.label}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={checkEligibility}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-900 font-bold text-sm rounded-xl hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Checking schemes..." : "Check My Eligible Schemes →"}
          </button>
        </div>
      )}

      {/* ───────── RESULTS ───────── */}
      {results && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {results.eligible.length + results.maybe.length}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Schemes Found</div>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{results.eligible.length}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Eligible</div>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-amber-400">{results.maybe.length}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Likely Eligible</div>
            </div>
          </div>

          {/* No results */}
          {results.eligible.length === 0 && results.maybe.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              <p>No matching schemes found for the details entered.</p>
              <p className="text-xs mt-1 text-gray-500">Try changing occupation, income, or selecting additional flags.</p>
            </div>
          )}

          {/* Eligible */}
          {results.eligible.length > 0 && (
            <>
              <div className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 mb-3">
                ✓ You are eligible for these schemes
              </div>
              {results.eligible.map((s) => (
                <SchemeCard
                  key={s.id}
                  scheme={s}
                  type="eligible"
                  expanded={expandedId === s.id}
                  onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
                />
              ))}
            </>
          )}

          {/* Maybe */}
          {results.maybe.length > 0 && (
            <>
              <div className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-3 mt-4">
                ~ Likely eligible — confirm at local office
              </div>
              {results.maybe.map((s) => (
                <SchemeCard
                  key={s.id}
                  scheme={s}
                  type="maybe"
                  expanded={expandedId === s.id}
                  onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
                />
              ))}
            </>
          )}

          {/* Reset */}
          <button
            onClick={reset}
            className="mt-4 w-full py-2.5 text-sm text-gray-400 border border-white/10 rounded-xl hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
          >
            ← Check Again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Scheme Card Sub-component ──────────────────────────────────────────────
function SchemeCard({ scheme, type, expanded, onToggle }) {
  const isEligible = type === "eligible";

  const TAG_COLORS = {
    Banking: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    Housing: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    Energy: "text-orange-300 bg-orange-500/10 border-orange-500/20",
    Agriculture: "text-green-300 bg-green-500/10 border-green-500/20",
    Health: "text-red-300 bg-red-500/10 border-red-500/20",
    Education: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    Maternity: "text-pink-300 bg-pink-500/10 border-pink-500/20",
    Pension: "text-yellow-300 bg-yellow-500/10 border-yellow-500/20",
    "Business Loan": "text-teal-300 bg-teal-500/10 border-teal-500/20",
    "Old Age Pension": "text-yellow-300 bg-yellow-500/10 border-yellow-500/20",
  };

  return (
    <div
      className={`rounded-xl mb-2.5 overflow-hidden border transition-all ${
        isEligible
          ? "border-green-500/25 border-l-2 border-l-green-400 bg-white/[0.02]"
          : "border-amber-500/20 border-l-2 border-l-amber-400 bg-white/[0.02]"
      }`}
    >
      {/* Header — always visible, click to expand */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-all"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`text-[10px] font-semibold px-2 py-1 rounded-md border whitespace-nowrap uppercase tracking-wider ${
              TAG_COLORS[scheme.tag] || "text-cyan-300 bg-cyan-500/10 border-cyan-500/20"
            }`}
          >
            {scheme.tag}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white leading-tight truncate">{scheme.name}</div>
            <div className="text-[11px] text-gray-500 mt-0.5 truncate">{scheme.ministry}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
              isEligible
                ? "text-green-400 bg-green-500/10 border-green-500/30"
                : "text-amber-400 bg-amber-500/10 border-amber-500/30"
            }`}
          >
            {isEligible ? "Eligible" : "Likely"}
          </span>
          <span className="text-gray-500 text-xs">{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5">
          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed mt-3 mb-3">{scheme.desc}</p>

          {/* Benefit */}
          <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-lg px-3 py-2.5 mb-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Benefit</div>
            <div className="text-sm text-cyan-300 font-medium">{scheme.benefit}</div>
          </div>

          {/* Documents */}
          <div className="mb-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Documents Needed</div>
            <div className="flex flex-wrap gap-1.5">
              {scheme.documents.map((d, i) => (
                <span
                  key={i}
                  className="text-[11px] text-gray-300 bg-white/5 border border-white/10 rounded-md px-2.5 py-1"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* How to Apply */}
          <div className="mb-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">How to Apply</div>
            <ol className="space-y-1.5">
              {scheme.howToApply.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-gray-400 leading-relaxed">
                  <span className="text-cyan-500 font-bold flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Apply Link */}
          <a
            href={scheme.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 border border-cyan-500/30 rounded-lg px-3 py-2 hover:bg-cyan-500/10 transition-all"
          >
            Visit Official Portal →
          </a>
        </div>
      )}
    </div>
  );
}
