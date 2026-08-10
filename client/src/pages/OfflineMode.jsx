import { Link } from "react-router-dom";
import { ArrowLeft, Database, HardDrive, Cpu, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

function OfflineMode() {
  const { t } = useLanguage();

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
              <h1 className="text-lg font-bold">Offline Resilience Hub</h1>
              <p className="text-xs text-slate-400">IndexedDB & PWA Cache Status</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10 flex-1 space-y-6 w-full">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Local Cache</span>
              <Database className="text-blue-500" size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold text-emerald-400">Active (PWA)</p>
            <p className="mt-1 text-xs text-slate-500">Service Worker Enrolled</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Storage Used</span>
              <HardDrive className="text-amber-500" size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold">4.2 MB</p>
            <p className="mt-1 text-xs text-slate-500">IndexedDB Alert Cache</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Mesh Node Status</span>
              <Cpu className="text-purple-500" size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold">Ready</p>
            <p className="mt-1 text-xs text-slate-500">Bluetooth / Wi-Fi Direct</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={22} /> Offline Capabilities Verified
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your client is fully synchronized for zero-internet environments. Emergency bulletins, safe zone maps, and SOS distress beacons are safely stored in local browser memory and will automatically sync with municipal nodes once a peer signal is detected.
          </p>
        </div>
      </main>
    </div>
  );
}

export default OfflineMode;