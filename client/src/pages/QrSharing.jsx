import { Link } from "react-router-dom";
import { ArrowLeft, QrCode, Share2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

function QrSharing() {
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
              <h1 className="text-lg font-bold">QR Alert Sharing</h1>
              <p className="text-xs text-slate-400">Peer-to-peer device scan distribution</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10 flex-1 flex flex-col items-center justify-center text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 max-w-md w-full space-y-6 shadow-2xl">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <QrCode size={40} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">Scan to Receive Active Alert</h2>
            <p className="text-xs text-slate-400 mt-2">
              Show this screen to nearby offline devices so they can scan and ingest the latest flash flood bulletin instantly without cellular data.
            </p>
          </div>

          {/* Mock QR Code Box */}
          <div className="bg-white p-6 rounded-2xl flex items-center justify-center">
            <div className="w-48 h-48 bg-slate-950 rounded-xl flex items-center justify-center text-white font-mono text-xs">
              [ MOCK MESH QR CODE ]
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <Share2 size={14} /> Broadcast Radius: Local Bluetooth & Camera Scan
          </div>
        </div>
      </main>
    </div>
  );
}

export default QrSharing;