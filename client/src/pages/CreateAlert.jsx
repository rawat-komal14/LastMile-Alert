import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, AlertTriangle } from "lucide-react";
import { createAlert } from "../services/api";

function CreateAlert() {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("red");
  const [category, setCategory] = useState("Flood");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [shelter, setShelter] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAlert({ title, severity, category, location, shelter, description });
      alert("Emergency alert successfully broadcasted and saved to MongoDB!");
      navigate("/authority");
    } catch (error) {
      console.error("Alert creation error:", error);
      alert("Failed to broadcast alert. Make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/authority"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-lg font-bold">Dispatch Emergency Warning</h1>
              <p className="text-xs text-slate-400">Authority Command Node</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">New Broadcast Parameters</h2>
              <p className="text-xs text-slate-400">
                This notice will sync instantly across MongoDB and local mesh nodes.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Alert Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Flash Flood Warning - Sector 4"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Severity Level
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="red">Red (Critical Danger / Evacuate)</option>
                  <option value="amber">Amber (Warning / Caution)</option>
                  <option value="info">Info (Public Notice / Utility)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="Flood">Flash Flood</option>
                  <option value="Storm">Cyclone / Storm</option>
                  <option value="Utility">Power / Utility Grid</option>
                  <option value="Medical">Medical / Relief</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Affected Area / Sector
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., River Basin & Lowlands Sector 4"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nearest Safe Shelter / Station
              </label>
              <input
                type="text"
                required
                value={shelter}
                onChange={(e) => setShelter(e.target.value)}
                placeholder="e.g., Community Hall (1.2 km)"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Emergency Instructions & Details
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide precise steps residents must take..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-semibold transition hover:bg-red-700 shadow-lg shadow-red-600/20"
            >
              <Send size={18} />
              Broadcast Emergency Warning Now
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateAlert;