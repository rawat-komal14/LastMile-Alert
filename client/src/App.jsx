import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import Alerts from "./pages/Alerts";
import CreateAlert from "./pages/CreateAlert";
import Shelters from "./pages/Shelters";
import OfflineMode from "./pages/OfflineMode";
import AiSummarizer from "./pages/AiSummarizer";
import QrSharing from "./pages/QrSharing";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/create-alert" element={<CreateAlert />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/offline-mode" element={<OfflineMode />} />
        <Route path="/ai-summarizer" element={<AiSummarizer />} />
        <Route path="/qr-sharing" element={<QrSharing />} />
      </Routes>
    </Router>
  );
}

export default App;