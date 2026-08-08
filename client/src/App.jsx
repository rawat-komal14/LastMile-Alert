import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import Alerts from "./pages/Alerts";
import Shelters from "./pages/Shelters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/shelters" element={<Shelters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;