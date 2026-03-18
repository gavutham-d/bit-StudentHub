import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  BrainCircuit,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react";

export default function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (_) {}
    onLogout();
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/resources", icon: BookOpen, label: "Resources" },
    { to: "/aptitude", icon: BrainCircuit, label: "Aptitude Hub" },
    { to: "/activity", icon: GraduationCap, label: "Activity" },
    { to: "/profile", icon: User, label: "My Profile" },
  ];

  const initials = user?.avatar || user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "??";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <div className="sidebar-logo-text">BIT Hub</div>
            <div className="sidebar-logo-sub">Student Portal</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <Icon className="nav-icon" size={18} />
            {label}
          </NavLink>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: 12 }}>Account</div>
        <button className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogOut className="nav-icon" size={18} />
          Sign Out
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-pill">
          <div className="sidebar-avatar">{initials}</div>
          <div style={{ overflow: "hidden" }}>
            <div className="sidebar-user-name">{user?.name || "Student"}</div>
            <div className="sidebar-user-email">{user?.id || ""}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
