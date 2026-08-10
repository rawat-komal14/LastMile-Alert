import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

function AiSummarizer() {
  const { t } = useLanguage();
  const [inputBulletin, setInputBulletin] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = (e) => {
    e.preventDefault();
    if (!inputBulletin) return;

    setLoading(true);
    setTimeout(() => {
      setSummary(
        `1. ACTION REQUIRED: Evacuate low-lying zones immediately.\n2. NEAREST SAFE ZONE: Community Hall Sector 4 (1.2 km away).\n3. ESSENTIALS: Carry water, first aid, and offline battery radios.`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/citizen"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-lg font-bold">AI Alert Summarizer</h1>
              <p className="text-xs text-slate-400">Distill long bulletins into action steps</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10 flex-1 space-y-6 w-full">
        <form onSubmit={handleSummarize} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Paste Long Official Bulletin or Text
            </label>
            <textarea
              rows={4}
              value={inputBulletin}
              onChange={(e) => setInputBulletin(e.target.value)}
              placeholder="Paste text here to extract critical evacuation steps..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
          >
            <Sparkles size={18} />
            {loading ? "Distilling..." : "Summarize Action Steps"}
          </button>
        </form>

        {summary && (
          <div className="rounded-3xl border border-amber-500/30 bg-amber-950/10 p-6 space-y-3">
            <h3 className="font-bold text-amber-400 flex items-center gap-2">
              <Sparkles size={18} /> Extracted Emergency Action Plan
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans leading-relaxed">
              {summary}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default AiSummarizer;