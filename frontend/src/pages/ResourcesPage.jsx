import { ExternalLink, Star, BookOpenText, Briefcase, Globe, Library, Award, FileText } from "lucide-react";

const resources = [
  {
    icon: Star,
    color: "#fff7ed",
    iconColor: "#ea580c",
    title: "Reward Points",
    desc: "Track your co-curricular achievement points, event participations, and view your overall reward score across all activities.",
    tag: "Academics",
    tagColor: "#ffedd5",
    tagTc: "#9a3412",
    url: "https://sites.google.com/bitsathy.ac.in/reward-status/home",
  },
  {
    icon: BookOpenText,
    color: "#eff6ff",
    iconColor: "#2563eb",
    title: "BIT Wiki",
    desc: "The student knowledge base — find guides, college policies, hostel info, transport details, and everything campus-related.",
    tag: "Information",
    tagColor: "#dbeafe",
    tagTc: "#1e40af",
    url: "https://wiki.bitsathy.ac.in/wiki/BITWIKI:Mainpage",
  },
  {
    icon: Globe,
    color: "#f0fdf4",
    iconColor: "#16a34a",
    title: "BIP Portal",
    desc: "Browse and apply for internships and projects through the BIT Internship Program. Connect with companies looking for BIT talent.",
    tag: "Career",
    tagColor: "#dcfce7",
    tagTc: "#166534",
    url: "https://bip.bitsathy.ac.in/nova/login",
  },
  {
    icon: Briefcase,
    color: "#faf5ff",
    iconColor: "#7c3aed",
    title: "PS Portal",
    desc: "Practice School portal for industrial training placements, mentor assignments, and evaluation submissions for PS-I & PS-II.",
    tag: "Training",
    tagColor: "#ede9fe",
    tagTc: "#5b21b6",
    url: "https://ps.bitsathy.ac.in/auth/login",
  },
  {
    icon: Award,
    color: "#fefce8",
    iconColor: "#ca8a04",
    title: "NAAC Reports",
    desc: "Review the institute's NAAC accreditation documents, annual reports, and quality benchmark publications.",
    tag: "Institutional",
    tagColor: "#fef9c3",
    tagTc: "#854d0e",
    url: "https://www.bitsathy.ac.in/naac/",
  },
  {
    icon: Globe,
    color: "#f8fafc",
    iconColor: "#475569",
    title: "College Website",
    desc: "The official Bannari Amman Institute of Technology website with news, faculty listings, events, and admissions info.",
    tag: "Official",
    tagColor: "#f1f5f9",
    tagTc: "#334155",
    url: "https://www.bitsathy.ac.in/",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <div className="page-section-title">Resources Directory</div>
      <div className="page-section-sub">
        All important portals and tools — one click away.
      </div>

      <div className="grid-3" style={{ gap: 20 }}>
        {resources.map(({ icon: Icon, color, iconColor, title, desc, tag, tagColor, tagTc, url }) => (
          <div className="resource-card" key={title}>
            <div className="resource-icon-wrap" style={{ background: color }}>
              <Icon size={24} color={iconColor} />
            </div>

            <span className="resource-tag" style={{ background: tagColor, color: tagTc }}>
              {tag}
            </span>

            <div>
              <div className="resource-title">{title}</div>
              <div className="resource-desc" style={{ marginTop: 6 }}>{desc}</div>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link-btn"
            >
              Open Portal
              <ExternalLink size={13} />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
