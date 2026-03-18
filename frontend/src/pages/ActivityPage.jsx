import { useState } from "react";
import {
  Star, FlaskConical, Users, MessageSquare,
  Calendar, Clock, ChevronDown, ChevronUp,
  Trophy, Cpu, Cloud, Shield, BarChart2,
  Wifi, Layers, Zap, Box, Link2, Plus,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────
const LAB_ICONS = {
  "Full Stack & DevOps": Layers,
  "Hackathon": Trophy,
  "Cloud Computing": Cloud,
  "Cybersecurity": Shield,
  "Data Science": BarChart2,
  "IoT": Wifi,
  "VLSI": Cpu,
  "Embedded": Zap,
  "XR Studio": Box,
  "Blockchain": Link2,
};

const LAB_COLORS = {
  "Full Stack & DevOps": { bg: "#eff6ff", ic: "#2563eb" },
  "Hackathon":           { bg: "#fefce8", ic: "#ca8a04" },
  "Cloud Computing":     { bg: "#f0fdf4", ic: "#16a34a" },
  "Cybersecurity":       { bg: "#fff1f2", ic: "#e11d48" },
  "Data Science":        { bg: "#faf5ff", ic: "#7c3aed" },
  "IoT":                 { bg: "#f0fdfa", ic: "#0d9488" },
  "VLSI":                { bg: "#fff7ed", ic: "#ea580c" },
  "Embedded":            { bg: "#fefce8", ic: "#a16207" },
  "XR Studio":           { bg: "#fdf4ff", ic: "#a21caf" },
  "Blockchain":          { bg: "#f0f9ff", ic: "#0284c7" },
};

const ROLES = ["Captain", "Vice-Captain", "Manager", "Strategist", "Member"];

const mockActivity = {
  rewardPoints: [
    { id: 1, event: "Inter-college Hackathon", category: "Technical", points: 25, date: "2025-02-10" },
    { id: 2, event: "NSS Volunteering Drive", category: "Social", points: 15, date: "2025-01-20" },
    { id: 3, event: "Paper Presentation – Symposium", category: "Academic", points: 20, date: "2025-01-08" },
    { id: 4, event: "Sports Meet – Volleyball", category: "Sports", points: 10, date: "2024-12-15" },
    { id: 5, event: "Workshop Attendance – AI/ML", category: "Technical", points: 8, date: "2024-11-30" },
  ],
  lab: "Full Stack & DevOps",
  groupId: "A#100123",
  role: "Captain",
  discussions: [
    {
      id: 1,
      title: "Sprint Planning – Week 12",
      author: "Arun K.",
      date: "2025-03-15",
      time: "10:00 AM",
      status: "Upcoming",
      messages: [
        { from: "Arun K.", text: "Let's finalise the feature list before the meet.", time: "9:40 AM" },
        { from: "Priya S.", text: "I'll prepare the backlog doc tonight.", time: "9:45 AM" },
      ],
    },
    {
      id: 2,
      title: "Docker & CI/CD Deep-dive",
      author: "Karthik R.",
      date: "2025-03-12",
      time: "3:00 PM",
      status: "Completed",
      messages: [
        { from: "Karthik R.", text: "Recording shared in the drive folder.", time: "4:20 PM" },
        { from: "Arun K.", text: "Thanks! Will review tonight.", time: "4:35 PM" },
        { from: "Divya M.", text: "Can someone share the slide deck too?", time: "4:50 PM" },
      ],
    },
    {
      id: 3,
      title: "Project Review – Phase 2 Demo",
      author: "Arun K.",
      date: "2025-03-18",
      time: "2:00 PM",
      status: "Upcoming",
      messages: [
        { from: "Arun K.", text: "Everyone please push your latest code before 1 PM.", time: "11:00 AM" },
      ],
    },
  ],
};

const POINT_CATEGORY_COLORS = {
  Technical: { bg: "#dbeafe", tc: "#1e40af" },
  Social:    { bg: "#dcfce7", tc: "#166534" },
  Academic:  { bg: "#ede9fe", tc: "#5b21b6" },
  Sports:    { bg: "#ffedd5", tc: "#9a3412" },
};

// ── Sub-components ─────────────────────────────────────────────────
function SectionCard({ icon: Icon, iconBg, iconColor, title, children }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #dde8ff",
      boxShadow: "0 2px 12px rgba(26,86,219,0.07)",
      overflow: "hidden",
      marginBottom: 24,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "18px 24px",
        borderBottom: "1px solid #eef2ff",
        background: "#fafcff",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: iconBg, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={18} color={iconColor} />
        </div>
        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700, fontSize: 15,
          color: "#0d1b3e",
        }}>{title}</span>
      </div>
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  );
}

function DiscussionThread({ disc }) {
  const [open, setOpen] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState(disc.messages);

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { from: "You", text: newMsg.trim(), time: timeStr }]);
    setNewMsg("");
  };

  return (
    <div style={{
      border: "1px solid #e8eeff",
      borderRadius: 12,
      marginBottom: 12,
      overflow: "hidden",
      transition: "box-shadow 0.2s",
    }}>
      {/* Header row */}
      <div
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          cursor: "pointer",
          background: open ? "#f5f8ff" : "#fff",
          transition: "background 0.15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: disc.status === "Upcoming" ? "#3b82f6" : "#16a34a",
            flexShrink: 0,
          }} />
          <div>
            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700, fontSize: 14,
              color: "#0d1b3e",
            }}>{disc.title}</div>
            <div style={{ fontSize: 12, color: "#8fa3c8", marginTop: 2 }}>
              {disc.author} · {disc.date} at {disc.time}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            padding: "3px 10px", borderRadius: 20,
            background: disc.status === "Upcoming" ? "#dbeafe" : "#dcfce7",
            color: disc.status === "Upcoming" ? "#1e40af" : "#166534",
            letterSpacing: "0.3px", textTransform: "uppercase",
          }}>{disc.status}</span>
          {open ? <ChevronUp size={16} color="#8fa3c8" /> : <ChevronDown size={16} color="#8fa3c8" />}
        </div>
      </div>

      {/* Messages panel */}
      {open && (
        <div style={{ borderTop: "1px solid #eef2ff" }}>
          {/* Schedule bar */}
          <div style={{
            display: "flex", gap: 20,
            padding: "10px 18px",
            background: "#f8faff",
            borderBottom: "1px solid #eef2ff",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4b5e8a" }}>
              <Calendar size={13} /> {disc.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4b5e8a" }}>
              <Clock size={13} /> {disc.time}
            </span>
          </div>

          {/* Messages */}
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column",
                alignItems: m.from === "You" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "78%",
                  background: m.from === "You" ? "#dbeafe" : "#f5f7ff",
                  borderRadius: m.from === "You" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  padding: "9px 13px",
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: m.from === "You" ? "#1e40af" : "#4b5e8a",
                    marginBottom: 3,
                  }}>{m.from}</div>
                  <div style={{ fontSize: 13, color: "#0d1b3e", lineHeight: 1.5 }}>{m.text}</div>
                </div>
                <span style={{ fontSize: 10, color: "#b8cef7", marginTop: 3 }}>{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            display: "flex", gap: 8,
            padding: "10px 18px 16px",
            borderTop: "1px solid #eef2ff",
          }}>
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "9px 13px",
                borderRadius: 8,
                border: "1.5px solid #dde8ff",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#0d1b3e",
                background: "#f5f8ff",
                outline: "none",
              }}
            />
            <button
              onClick={sendMsg}
              style={{
                padding: "9px 16px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #3b82f6, #1a56db)",
                color: "#fff",
                border: "none",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              <Plus size={14} /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function ActivityPage({ user }) {
  const { rewardPoints, lab, groupId, role, discussions } = mockActivity;
  const totalPoints = rewardPoints.reduce((s, r) => s + r.points, 0);
  const LabIcon = LAB_ICONS[lab] || FlaskConical;
  const labColor = LAB_COLORS[lab] || { bg: "#f0f4ff", ic: "#1a56db" };

  return (
    <>
      <div className="page-section-title">Activity</div>
      <div className="page-section-sub">
        Your reward points, special lab, group details, and discussion panel.
      </div>

      {/* ── Row 1: Reward Points + Lab & Group ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 0 }}>

        {/* Reward Points */}
        <SectionCard icon={Star} iconBg="#fefce8" iconColor="#ca8a04" title="Reward Points">
          {/* Total badge */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 13, color: "#4b5e8a" }}>Total accumulated</span>
            <span style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800, fontSize: 26,
              color: "#ca8a04",
            }}>{totalPoints} <span style={{ fontSize: 13, fontWeight: 600, color: "#8fa3c8" }}>pts</span></span>
          </div>

          {/* Progress bar */}
          <div style={{
            height: 6, background: "#f1f5f9",
            borderRadius: 99, marginBottom: 18, overflow: "hidden",
          }}>
            <div style={{
              width: `${Math.min((totalPoints / 200) * 100, 100)}%`,
              height: "100%",
              background: "linear-gradient(90deg, #f59e0b, #ca8a04)",
              borderRadius: 99,
              transition: "width 0.6s ease",
            }} />
          </div>

          {/* Entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rewardPoints.map((r) => {
              const cc = POINT_CATEGORY_COLORS[r.category] || { bg: "#f1f5f9", tc: "#334155" };
              return (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: "#fafcff",
                  border: "1px solid #eef2ff",
                  borderRadius: 10,
                }}>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: "#0d1b3e",
                      fontFamily: "'Nunito', sans-serif",
                    }}>{r.event}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700,
                        padding: "2px 8px", borderRadius: 20,
                        background: cc.bg, color: cc.tc,
                        textTransform: "uppercase", letterSpacing: "0.3px",
                      }}>{r.category}</span>
                      <span style={{ fontSize: 11, color: "#8fa3c8" }}>{r.date}</span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800, fontSize: 16,
                    color: "#16a34a",
                  }}>+{r.points}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Lab & Group Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Special Lab */}
          <SectionCard icon={FlaskConical} iconBg="#eff6ff" iconColor="#2563eb" title="Special Lab">
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "16px",
              background: labColor.bg,
              borderRadius: 12,
              border: `1px solid ${labColor.ic}22`,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                flexShrink: 0,
              }}>
                <LabIcon size={24} color={labColor.ic} />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800, fontSize: 16,
                  color: "#0d1b3e",
                }}>{lab}</div>
                <div style={{ fontSize: 12, color: "#4b5e8a", marginTop: 3 }}>
                  Assigned special lab domain
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Group ID & Role */}
          <SectionCard icon={Users} iconBg="#ede9fe" iconColor="#7c3aed" title="Group Details">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Group ID */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#f5f3ff",
                borderRadius: 10,
                border: "1px solid #ddd6fe",
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "#8fa3c8", fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>
                    Group ID
                  </div>
                  <div style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800, fontSize: 22,
                    color: "#7c3aed", letterSpacing: "-0.5px",
                  }}>{groupId}</div>
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#ede9fe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Users size={18} color="#7c3aed" />
                </div>
              </div>

              {/* Role */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#fff7ed",
                borderRadius: 10,
                border: "1px solid #fed7aa",
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "#8fa3c8", fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>
                    Role
                  </div>
                  <div style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800, fontSize: 22,
                    color: "#ea580c", letterSpacing: "-0.5px",
                  }}>{role}</div>
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#ffedd5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Trophy size={18} color="#ea580c" />
                </div>
              </div>

            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Row 2: Group Discussion Panel ── */}
      <SectionCard icon={MessageSquare} iconBg="#f0fdf4" iconColor="#16a34a" title="Group Discussion Panel">
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 13, color: "#4b5e8a" }}>
            {discussions.length} threads · {discussions.filter(d => d.status === "Upcoming").length} upcoming
          </span>
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 12, color: "#16a34a", fontWeight: 600,
          }}>
            <Calendar size={13} /> Group {groupId}
          </span>
        </div>

        {discussions.map((disc) => (
          <DiscussionThread key={disc.id} disc={disc} />
        ))}
      </SectionCard>
    </>
  );
}
