import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  MapPin,
  Filter,
  ArrowLeft,
  WifiOff,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  Globe,
} from "lucide-react";
import { fetchAlerts } from "../services/api";

// Multi-language UI dictionary
const translations = {
  "en-US": {
    title: "Emergency Alert Feeds",
    subtitle: "Voice Broadcast & Accessibility Mode",
    statusBadge: "Audio Ready Offline",
    heading: "Active Voice Broadcasts",
    subheading: "Click the speaker icon on any alert to listen to instructions read aloud.",
    filterLabel: "Filter:",
    all: "all",
    red: "red",
    amber: "amber",
    info: "info",
    listen: "Listen Aloud",
    stop: "Stop Audio",
    nearestShelter: "Nearest Shelter / Post:",
    acknowledge: "Acknowledge & Confirm Safety",
    confirmed: "Safety Confirmed",
    noAlerts: "No alerts found for this severity level.",
  },
  "hi-IN": {
    title: "आपातकालीन चेतावनी फ़ीड",
    subtitle: "वॉइस ब्रॉडकास्ट और एसेबिलिटी मोड",
    statusBadge: "ऑफ़लाइन ऑडियो तैयार",
    heading: "सक्रिय वॉइस ब्रॉडकास्ट",
    subheading: "निर्देश सुनने के लिए किसी भी चेतावनी पर स्पीकर आइकन पर क्लिक करें।",
    filterLabel: "फ़िल्टर:",
    all: "सभी",
    red: "लाल",
    amber: "पीला",
    info: "सूचना",
    listen: "बोलकर सुनें",
    stop: "ऑडियो रोकें",
    nearestShelter: "निकटतम आश्रय / पोस्ट:",
    acknowledge: "स्वीकार करें और सुरक्षा की पुष्टि करें",
    confirmed: "सुरक्षा की पुष्टि हुई",
    noAlerts: "इस गंभीरता स्तर के लिए कोई चेतावनी नहीं मिली.",
  },
  "es-ES": {
    title: "Feeds de Alerta de Emergencia",
    subtitle: "Modo de Difusión de Voz y Accesibilidad",
    statusBadge: "Audio Listo Sin Conexión",
    heading: "Transmisiones de Voz Activas",
    subheading: "Haga clic en el icono del altavoz en cualquier alerta para escuchar las instrucciones.",
    filterLabel: "Filtro:",
    all: "todos",
    red: "rojo",
    amber: "ámbar",
    info: "información",
    listen: "Escuchar en Voz Alta",
    stop: "Detener Audio",
    nearestShelter: "Refugio / Puesto más cercano:",
    acknowledge: "Reconocer y Confirmar Seguridad",
    confirmed: "Seguridad Confirmada",
    noAlerts: "No se encontraron alertas para este nivel de gravedad.",
  },
};

function Alerts() {
  const [filter, setFilter] = useState("all");
  const [alertsData, setAlertsData] = useState([]);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState({});
  const [lang, setLang] = useState("en-US");
  const [speakingId, setSpeakingId] = useState(null);

  const t = translations[lang] || translations["en-US"];

  useEffect(() => {
    fetchAlerts()
      .then((res) => setAlertsData(res.data))
      .catch((err) => {
        console.warn("Using offline fallback alerts data:", err);
        setAlertsData([
          {
            _id: "1",
            title: "Flash Flood Warning - Sector 4",
            severity: "red",
            category: "Flood",
            location: "River Basin & Lowlands",
            shelter: "Community Hall (1.2 km)",
            description: "Water levels rising rapidly near the main river basin. Residents in low-lying areas must evacuate immediately to designated higher-ground shelters.",
            createdAt: new Date(),
          },
          {
            _id: "2",
            title: "Severe Cyclone Storm Alert",
            severity: "red",
            category: "Storm",
            location: "Coastal Grid Zones 1-3",
            shelter: "Government Higher Secondary School (3.4 km)",
            description: "High-velocity winds exceeding 110km/h expected. Secure loose outdoor items, stay away from glass windows, and remain indoors.",
            createdAt: new Date(),
          },
        ]);
      });
  }, []);

  const handleAcknowledge = (id) => {
    setAcknowledgedAlerts((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Text-to-Speech Voice Broadcast Handler with Voice Locale Matching
  const speakAlert = (alert) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === alert._id) {
      setSpeakingId(null);
      return;
    }

    const textToSpeak = `${alert.title}. Location: ${alert.location}. Details: ${alert.description}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = lang;
    utterance.rate = 0.95;

    // Match browser voice profile to selected language
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (voice) => voice.lang === lang || voice.lang.startsWith(lang.slice(0, 2))
    );
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(alert._id);
    window.speechSynthesis.speak(utterance);
  };

  const filteredAlerts =
    filter === "all"
      ? alertsData
      : alertsData.filter((alert) => alert.severity === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/citizen"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-lg font-bold">{t.title}</h1>
              <p className="text-xs text-slate-400">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Language Selector */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
              <Globe size={14} className="text-red-500" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="en-US" className="bg-slate-900 text-white">English</option>
                <option value="hi-IN" className="bg-slate-900 text-white">Hindi (हिन्दी)</option>
                <option value="es-ES" className="bg-slate-900 text-white">Spanish (Español)</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              <WifiOff size={13} />
              <span>{t.statusBadge}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t.heading}</h2>
            <p className="text-sm text-slate-400">{t.subheading}</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="flex items-center gap-1 text-xs text-slate-500 mr-1">
              <Filter size={14} /> {t.filterLabel}
            </span>
            {["all", "red", "amber", "info"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  filter === lvl
                    ? "bg-red-600 text-white shadow"
                    : "border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                {t[lvl] || lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Cards Feed */}
        <div className="mt-8 space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-500">
              {t.noAlerts}
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const isAcknowledged = acknowledgedAlerts[alert._id];
              const isSpeaking = speakingId === alert._id;

              const borderStyles =
                alert.severity === "red"
                  ? "border-red-500/30 bg-red-950/10"
                  : alert.severity === "amber"
                  ? "border-amber-500/30 bg-amber-950/10"
                  : "border-blue-500/30 bg-blue-950/10";

              const badgeStyles =
                alert.severity === "red"
                  ? "bg-red-500/20 text-red-400"
                  : alert.severity === "amber"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-blue-500/20 text-blue-400";

              return (
                <div
                  key={alert._id}
                  className={`rounded-2xl border p-6 transition ${borderStyles}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeStyles}`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={13} /> {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => speakAlert(alert)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition border ${
                          isSpeaking
                            ? "bg-red-600 text-white border-red-500 animate-pulse"
                            : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
                        }`}
                        title="Read alert aloud"
                      >
                        {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        {isSpeaking ? t.stop : t.listen}
                      </button>

                      <span className="text-xs font-medium text-slate-400 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
                        {alert.location}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">{alert.title}</h3>
                  <p className="mt-2 text-slate-300 leading-relaxed text-sm">
                    {alert.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-800/60 pt-4 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin size={15} className="text-red-500" />
                      {t.nearestShelter}{" "}
                      <strong className="text-white">{alert.shelter}</strong>
                    </span>

                    <button
                      onClick={() => handleAcknowledge(alert._id)}
                      disabled={isAcknowledged}
                      className={`rounded-lg px-4 py-2 font-medium transition ${
                        isAcknowledged
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                          : "bg-slate-900 border border-slate-700 text-white hover:bg-slate-800"
                      }`}
                    >
                      {isAcknowledged ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={14} /> {t.confirmed}
                        </span>
                      ) : (
                        t.acknowledge
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default Alerts;