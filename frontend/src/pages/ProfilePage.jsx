import { useNavigate } from "react-router-dom";
import {
  Mail, Phone, Hash, GraduationCap, BookOpen,
  Star, LogOut, ShieldCheck,
} from "lucide-react";

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (_) {}
    onLogout();
    navigate("/login");
  };

  const initials = user?.avatar || user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "??";

  const infoItems = [
    { icon: Mail, label: "Email Address", value: user?.email },
    { icon: Hash, label: "Student ID", value: user?.id },
    { icon: GraduationCap, label: "Department", value: user?.department },
    { icon: BookOpen, label: "Current Year", value: user?.year },
    { icon: Star, label: "CGPA", value: user?.cgpa },
    { icon: Phone, label: "Phone Number", value: user?.phone },
  ];

  return (
    <>
      {/* Hero */}
      <div className="profile-hero">
        <div className="profile-avatar-lg">{initials}</div>
        <div>
          <div className="profile-hero-name">{user?.name}</div>
          <div className="profile-hero-id">{user?.id}</div>
          <div className="profile-badges">
            <span className="profile-badge">🎓 {user?.year}</span>
            <span className="profile-badge">📘 {user?.department?.split(" ")[0]}</span>
            <span className="profile-badge">⭐ CGPA {user?.cgpa}</span>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 24, alignItems: "start" }}>
        {/* Info */}
        <div>
          <div className="page-section-title">Academic Details</div>
          <div className="page-section-sub">Your registered institutional information</div>

          <div className="info-grid">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div className="info-item" key={label}>
                <div className="info-label">
                  <Icon size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                  {label}
                </div>
                <div className="info-value">{value || "—"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div>
          <div className="page-section-title">Account</div>
          <div className="page-section-sub">Manage your session and preferences</div>

          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42,
                background: "#dcfce7",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <ShieldCheck size={20} color="#16a34a" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                  Session Active
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Authenticated via @bitsathy.ac.in
                </div>
              </div>
            </div>

            <div style={{
              padding: "12px 14px",
              background: "var(--bg-base)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-light)",
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}>
              You are securely logged in as a verified BIT Sathy student.
              Your session data is stored locally and can be cleared at any time.
            </div>

            <button
              className="btn btn-danger"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Sign Out of BIT Hub
            </button>
          </div>

          {/* Achievement mini card */}
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 12, color: "var(--text-primary)" }}>
              Quick Stats
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Reward Points", value: "128", color: "#ea580c", bg: "#ffedd5" },
                { label: "Aptitude Score", value: "85%", color: "#7c3aed", bg: "#ede9fe" },
                { label: "Sessions Active", value: "1", color: "#16a34a", bg: "#dcfce7" },
              ].map(({ label, value, color, bg }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    background: bg,
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
