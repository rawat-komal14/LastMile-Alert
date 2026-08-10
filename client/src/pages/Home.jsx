import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  MapPin,
  WifiOff,
  Radio,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Home() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
              <ShieldAlert size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold">LastMile Alert</h1>
              <p className="text-xs text-slate-400">
                Resilient Emergency Network
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/alerts"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Alerts
            </Link>

            <Link
              to="/shelters"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Shelters
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-800"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                Emergency Network Active
              </div>

              <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
                When the internet fails,
                <span className="text-red-500"> safety shouldn't.</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                LastMile Alert delivers critical emergency warnings to rural
                communities even when traditional communication networks are
                unavailable.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/alerts"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
                >
                  View Active Alerts
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/shelters"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
                >
                  <MapPin size={18} />
                  Find Shelter
                </Link>
              </div>
            </div>

            {/* Right emergency card */}
            <div className="relative">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                      <ShieldAlert />
                    </div>

                    <div>
                      <p className="font-semibold">Emergency Alert</p>
                      <p className="text-xs text-slate-500">
                        Received 2 minutes ago
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
                    RED
                  </span>
                </div>

                <div className="py-6">
                  <h3 className="text-2xl font-bold">
                    Flash Flood Warning
                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    Heavy rainfall may cause flooding in low-lying areas.
                    Residents are advised to move to designated shelters.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-800/70 p-4">
                    <p className="text-xs text-slate-500">Affected Area</p>
                    <p className="mt-1 font-medium">5 Villages</p>
                  </div>

                  <div className="rounded-xl bg-slate-800/70 p-4">
                    <p className="text-xs text-slate-500">Nearest Shelter</p>
                    <p className="mt-1 font-medium">1.8 km</p>
                  </div>
                </div>

                <button
                  onClick={() => setAcknowledged(true)}
                  disabled={acknowledged}
                  className={`mt-5 w-full rounded-xl py-3 font-semibold transition ${
                    acknowledged
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {acknowledged ? "✓ Alert Acknowledged & Safety Confirmed" : "Acknowledge Alert"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-800 bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                Built for the last mile
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                Communication that survives disruption
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<WifiOff />}
                title="Offline First"
                description="Critical alerts, shelters and emergency instructions remain accessible even without internet."
              />

              <FeatureCard
                icon={<Radio />}
                title="Multi-Channel"
                description="Designed to switch between available communication channels when connectivity becomes unreliable."
              />

              <FeatureCard
                icon={<ShieldCheck />}
                title="Trusted Alerts"
                description="Official alerts are presented clearly with severity levels and simple instructions."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 md:flex-row">
          <p>© 2026 LastMile Alert</p>
          <p>Emergency information • Offline ready • Community focused</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
        {icon}
      </div>

      <h4 className="text-xl font-semibold">{title}</h4>

      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

export default Home;