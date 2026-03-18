import { useLocation, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

const pageMeta = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back to your hub" },
  "/resources": { title: "Resources", subtitle: "Quick access to all portals" },
  "/aptitude": { title: "Aptitude Hub", subtitle: "Practice and sharpen your skills" },
  "/activity": { title: "Activity", subtitle: "Your lab, group & discussion details" },
  "/profile": { title: "My Profile", subtitle: "Your academic identity" },
};

export default function Header({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const meta = pageMeta[location.pathname] || { title: "BIT Hub", subtitle: "" };
  const initials = user?.avatar || user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "??";

  return (
    <header className="page-header">
      <div className="header-left">
        <span className="header-title">{meta.title}</span>
        <span className="header-subtitle">{meta.subtitle}</span>
      </div>
      <div className="header-right">
        <span className="header-badge">
          <span role="img" aria-label="university" style={{ marginRight: 4 }}>🎓</span>
          {user?.year || "Student"}
        </span>
        <div
          className="header-avatar"
          title={user?.name}
          onClick={() => navigate("/profile")}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
