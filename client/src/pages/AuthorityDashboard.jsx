import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  PlusCircle,
  Users,
  Radio,
  LogOut,
  AlertTriangle,
  CheckCircle,
  X,
  Edit3,
  Trash2,
  CheckCircle2,
} from "lucide-react";

function AuthorityDashboard() {
  // State for alerts list so we can update/delete them live
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Flash Flood Warning - Sector 4",
      severity: "RED WARNING",
      severityClass: "bg-red-500/20 text-red-400 border-red-500/30",
      location: "River Basin & Lowlands",
      recipients: 1200,
      acknowledgedCount: 1008,
      status: "Active",
      time: "10m ago",
    },
    {
      id: 2,
      title: "Severe Cyclone Storm Alert",
      severity: "RED WARNING",
      severityClass: "bg-red-500/20 text-red-400 border-red-500/30",
      location: "Coastal Grid Zones 1-3",
      recipients: 4500,
      acknowledgedCount: 3820,
      status: "Active",
      time: "45m ago",
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null); // Modal state

  // Handle resolving an alert
  const handleResolve = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "Resolved", severityClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", severity: "RESOLVED" } : alert
      )
    );
    setSelectedAlert(null);
    alert("Broadcast marked as resolved and closed across mesh network.");
  };

  // Handle deleting an alert
  const handleDelete = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    setSelectedAlert(null);
    alert("Warning revoked and removed from live citizen feeds.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
              <ShieldAlert size={23} />
            </div>
            <div>
              <h1 className="text-lg font-bold">Authority Command Center</h1>
              <p className="text-xs text-slate-400">Disaster Management Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-400 md:flex">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Broadcast Uplink Active
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

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
              Emergency Broadcast Node #01
            </span>
            <h2 className="mt-2 text-3xl font-bold">Control & Dispatch Center</h2>
            <p className="mt-2 text-slate-400 max-w-2xl">
              Issue verified warnings, track citizen acknowledgment ratios, and push peer-to-peer sync packages across offline mesh channels.
            </p>
          </div>

          <Link
            to="/create-alert"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-semibold transition hover:bg-red-700 shadow-lg shadow-red-600/20 whitespace-nowrap"
          >
            <PlusCircle size={20} />
            Create New Alert
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Active Warnings</span>
              <AlertTriangle className="text-red-500" size={20} />
            </div>
            <p className="mt-4 text-3xl font-bold">{alerts.filter(a => a.status === "Active").length}</p>
            <p className="mt-1 text-xs text-slate-500">Live operational broadcasts</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Citizens Reached</span>
              <Users className="text-emerald-500" size={20} />
            </div>
            <p className="mt-4 text-3xl font-bold">14,280</p>
            <p className="mt-1 text-xs text-slate-500">92% Acknowledgment Rate</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-sm font-medium">Mesh Nodes Online</span>
              <Radio className="text-amber-500" size={20} />
            </div>
            <p className="mt-4 text-3xl font-bold">38 / 40</p>
            <p className="mt-1 text-xs text-slate-500">Local Wi-Fi & Bluetooth Repeater Active</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6">Dispatched Broadcast History & Management</h3>

          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-500">
                No active broadcasts found.
              </div>
            ) : (
              alerts.map((alert) => {
                const percent = Math.round((alert.acknowledgedCount / alert.recipients) * 100);
                return (
                  <div
                    key={alert.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition hover:border-slate-700"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${alert.severityClass}`}>
                          {alert.severity}
                        </span>
                        <span className="text-xs text-slate-400">Dispatched {alert.time}</span>
                        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
                          Status: {alert.status}
                        </span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold">{alert.title}</h4>
                      <p className="mt-1 text-sm text-slate-400">
                        Target Area: {alert.location} • {alert.recipients} recipients
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle size={14} /> {percent}% Confirmed
                        </span>
                        <span className="text-xs text-slate-500">{alert.acknowledgedCount} acknowledged</span>
                      </div>
                      <button
                        onClick={() => setSelectedAlert(alert)}
                        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-700 flex items-center gap-1.5"
                      >
                        <Edit3 size={15} /> Manage
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Warning Management Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Manage Broadcast</h3>
                  <p className="text-xs text-slate-400">Control active mesh dissemination</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="text-xs text-slate-500 block">Selected Warning</span>
                <strong className="text-white text-base block mt-1">{selectedAlert.title}</strong>
                <p className="text-xs text-slate-400 mt-1">Location: {selectedAlert.location}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-600/30"
                >
                  <CheckCircle2 size={16} /> Mark as Resolved / Safe
                </button>

                <button
                  onClick={() => handleDelete(selectedAlert.id)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600/20 border border-red-500/30 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-600/30"
                >
                  <Trash2 size={16} /> Revoke & Delete Warning
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedAlert(null)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthorityDashboard;