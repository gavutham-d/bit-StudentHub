import { useNavigate } from "react-router-dom";
import {
  BookOpen, BrainCircuit, Trophy, Star,
  Clock, TrendingUp, ExternalLink, ArrowRight,
} from "lucide-react";

export default function DashboardPage({ user }) {
  const navigate = useNavigate();

  const stats = [
    { icon: Trophy, color: "blue", value: user?.cgpa || "—", label: "CGPA" },
    { icon: Star, color: "green", value: "128", label: "Reward Points" },
    { icon: Clock, color: "orange", value: user?.year || "—", label: "Current Year" },
    { icon: TrendingUp, color: "purple", value: "85%", label: "Aptitude Score" },
  ];

  const quickLinks = [
    {
      icon: BookOpen,
      color: "#dbeafe",
      iconColor: "#1d4ed8",
      name: "Resources",
      desc: "Access portals & important links",
      path: "/resources",
    },
    {
      icon: BrainCircuit,
      color: "#ede9fe",
      iconColor: "#7c3aed",
      name: "Aptitude Hub",
      desc: "Practice Quant, LR & Verbal",
      path: "/aptitude",
    },
    {
      icon: Trophy,
      color: "#dcfce7",
      iconColor: "#16a34a",
      name: "Reward Points",
      desc: "Check your accumulated points",
      path: "/resources",
    },
    {
      icon: Star,
      color: "#ffedd5",
      iconColor: "#ea580c",
      name: "BIP Portal",
      desc: "Browse internship opportunities",
      path: "/resources",
    },
  ];

  const announcements = [
    { label: "NEW", color: "#dcfce7", tc: "#166534", text: "Internal Assessment results uploaded on ERP portal." },
    { label: "EVENT", color: "#dbeafe", tc: "#1e40af", text: "Symposium 2025 registrations open — deadline March 30." },
    { label: "ALERT", color: "#ffedd5", tc: "#9a3412", text: "Library dues clearance required before April 5." },
  ];

  return (
    <>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <h2>Hello, {user?.name?.split(" ")[0] || "Student"} 👋</h2>
          <p>{user?.department} · {user?.id}</p>
          <div className="welcome-meta">
            <span className="welcome-meta-item">
              🏫 Bannari Amman Institute of Technology
            </span>
            <span className="welcome-meta-item">
              📅 Semester — Spring 2025
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {stats.map(({ icon: Icon, color, value, label }) => (
          <div className="stat-card" key={label}>
            <div className={`stat-icon ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 24 }}>
        {/* Quick Access */}
        <div>
          <div className="page-section-title">Quick Access</div>
          <div className="page-section-sub">Jump to any section instantly</div>
          <div className="grid-2" style={{ gap: 14 }}>
            {quickLinks.map(({ icon: Icon, color, iconColor, name, desc, path }) => (
              <div
                className="quick-link-card"
                key={name}
                onClick={() => navigate(path)}
              >
                <div className="quick-link-icon" style={{ background: color }}>
                  <Icon size={20} color={iconColor} />
                </div>
                <div>
                  <div className="quick-link-name">{name}</div>
                  <div className="quick-link-desc">{desc}</div>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div>
          <div className="page-section-title">Announcements</div>
          <div className="page-section-sub">Latest updates from campus</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {announcements.map(({ label, color, tc, text }) => (
              <div
                key={text}
                className="card"
                style={{ padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <span
                  className="resource-tag"
                  style={{ background: color, color: tc, flexShrink: 0, marginTop: 1 }}
                >
                  {label}
                </span>
                <span style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {text}
                </span>
              </div>
            ))}

            <div className="card" style={{ padding: "16px 20px", textAlign: "center" }}>
              <a
                href="https://bitsathy.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <ExternalLink size={14} />
                Visit College Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
