import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
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
  );
}