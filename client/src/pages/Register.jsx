import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, User, ArrowRight } from "lucide-react";
import { registerUser } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call backend register route
      const { data } = await registerUser({ name, email, password, role });
      alert(data.message || "Account registered successfully!");

      if (role === "authority") {
        navigate("/authority");
      } else {
        navigate("/citizen");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.error || "Registration failed or server offline.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
              <ShieldAlert size={26} />
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Join the resilient emergency alert network
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

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

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
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-red-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;