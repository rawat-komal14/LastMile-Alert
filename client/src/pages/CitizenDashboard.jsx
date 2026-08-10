import { Link } from "react-router-dom";
import {
  ShieldAlert,
  MapPin,
  WifiOff,
  QrCode,
  Sparkles,
  Database,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

function CitizenDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg">
              <ShieldAlert size={23} />
            </div>
            <div>
              <h1 className="text-lg font-bold">{t.citizenDash}</h1>
              <p className="text-xs text-slate-400">LastMile Secure Client</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector />

            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 md:flex">
              <WifiOff size={13} />
              <span>{t.liveMesh}</span>
            </div>

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        {/* Welcome Header */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
            {t.welcome}
          </span>
          <h2 className="mt-2 text-3xl font-bold">Citizen Emergency Portal</h2>
          <p className="mt-2 text-slate-400 max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Alerts Card */}
          <Link
            to="/alerts"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-red-500/50 hover:bg-slate-900/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-500 mb-4 transition group-hover:scale-110">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-xl font-bold">{t.activeAlerts}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.activeAlertsDesc}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-red-500">
              <span>Open Feed</span> <ArrowRight size={14} />
            </div>
          </Link>

          {/* Shelters Card */}
          <Link
            to="/shelters"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500/50 hover:bg-slate-900/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 mb-4 transition group-hover:scale-110">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold">{t.shelters}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.sheltersDesc}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-500">
              <span>Find Safe Zones</span> <ArrowRight size={14} />
            </div>
          </Link>

          {/* Offline Mode Card */}
          <Link
            to="/offline-mode"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/50 hover:bg-slate-900/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-500 mb-4 transition group-hover:scale-110">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-bold">{t.offlineHub}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.offlineHubDesc}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-500">
              <span>View Storage</span> <ArrowRight size={14} />
            </div>
          </Link>

          {/* AI Summarizer Card */}
          <Link
            to="/ai-summarizer"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500/50 hover:bg-slate-900/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500 mb-4 transition group-hover:scale-110">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold">{t.aiSummarizer}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.aiSummarizerDesc}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-500">
              <span>Launch Summarizer</span> <ArrowRight size={14} />
            </div>
          </Link>

          {/* QR Sharing Card */}
          <Link
            to="/qr-sharing"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-purple-500/50 hover:bg-slate-900/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-500 mb-4 transition group-hover:scale-110">
              <QrCode size={24} />
            </div>
            <h3 className="text-xl font-bold">{t.qrSharing}</h3>
            <p className="mt-2 text-sm text-slate-400">{t.qrSharingDesc}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-500">
              <span>Generate QR Code</span> <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CitizenDashboard;