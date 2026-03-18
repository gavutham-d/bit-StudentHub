import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ResourcesPage from "./pages/ResourcesPage";
import AptitudePage from "./pages/AptitudePage";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";

// Protected layout wrapper
function AppShell({ user, onLogout }) {
  return (
    <div className="app-shell">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="main-content">
        <Header user={user} />
        <div className="page-body">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/aptitude" element={<AptitudePage />} />
            <Route path="/activity" element={<ActivityPage user={user} />} />
            <Route path="/profile" element={<ProfilePage user={user} onLogout={onLogout} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const savedUser = localStorage.getItem("bits_user");
    const savedToken = localStorage.getItem("bits_token");
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("bits_user", JSON.stringify(userData));
    localStorage.setItem("bits_token", token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("bits_user");
    localStorage.removeItem("bits_token");
  };

  if (loading) {
    return (
      <div className="spinner-wrap" style={{ height: "100vh" }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route
            path="/*"
            element={<AppShell user={user} onLogout={handleLogout} />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}
