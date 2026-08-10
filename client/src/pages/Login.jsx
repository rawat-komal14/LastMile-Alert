import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, ArrowRight } from "lucide-react";
import { loginUser } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Call backend login route
      const { data } = await loginUser({ email, password });
      alert(data.message || "Login successful!");

      // Route based on database user role
      if (data.user.role === "authority") {
        navigate("/authority");
      } else {
        navigate("/citizen");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Invalid credentials or server offline.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 text-white py-6">
      {/* Top bar with Language Selector */}
      <div className="flex justify-end max-w-md mx-auto w-full mb-4">
        <LanguageSelector />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
                <ShieldAlert size={26} />
              </div>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to access your emergency network dashboard
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-slate-950 p-1.5 border border-slate-800">
            <button
              type="button"
              onClick={() => setRole("citizen")}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                role === "citizen"
                  ? "bg-red-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Citizen
            </button>
            <button
              type="button"
              onClick={() => setRole("authority")}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                role === "authority"
                  ? "bg-red-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Authority
            </button>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-semibold transition hover:bg-red-700"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-red-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;