import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, GraduationCap } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_BASE}/api/auth/login`, {
      // const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        onLogin(data.user, data.token);
        navigate("/dashboard");
      }
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blobTop} />
      <div style={styles.blobBottom} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>
            <GraduationCap size={22} color="white" strokeWidth={2} />
          </div>
          <div>
            <div style={styles.logoName}>BIT Student Hub</div>
            <div style={styles.logoSub}>Bannari Amman Institute of Technology</div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Welcome message */}
        <div style={styles.welcomeBlock}>
          <h1 style={styles.welcomeTitle}>Welcome back 👋</h1>
          <p style={styles.welcomeSubtitle}>
            Sign in with your institutional email to access your student portal.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
              placeholder="yourname@bitsathy.ac.in"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span style={styles.btnInner}>
                <Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} />
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff 0%, #f0f7ff 50%, #e8f0fe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  },
  blobTop: {
    position: "absolute",
    top: "-120px", left: "-120px",
    width: "400px", height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blobBottom: {
    position: "absolute",
    bottom: "-100px", right: "-100px",
    width: "350px", height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(14,63,168,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    border: "1px solid #dde8ff",
    boxShadow: "0 8px 40px rgba(26,86,219,0.13)",
    padding: "40px 44px",
    width: "100%",
    maxWidth: "440px",
    position: "relative",
    zIndex: 1,
    animation: "pageIn 0.35s ease both",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIcon: {
    width: "44px", height: "44px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3b82f6, #1a56db)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
    flexShrink: 0,
  },
  logoName: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "800",
    fontSize: "16px",
    color: "#0d1b3e",
    letterSpacing: "-0.3px",
    lineHeight: "1.2",
  },
  logoSub: {
    fontSize: "11px",
    color: "#8fa3c8",
    fontWeight: "400",
  },
  divider: {
    height: "1px",
    background: "#eef2ff",
    margin: "24px 0",
  },
  welcomeBlock: {
    marginBottom: "24px",
  },
  welcomeTitle: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: "24px",
    fontWeight: "800",
    color: "#0d1b3e",
    letterSpacing: "-0.4px",
    margin: "0 0 8px 0",
  },
  welcomeSubtitle: {
    fontSize: "14px",
    color: "#4b5e8a",
    lineHeight: "1.6",
    margin: 0,
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "18px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "18px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#0d1b3e",
  },
  input: {
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #dde8ff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#0d1b3e",
    background: "#f5f8ff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    marginTop: "4px",
    background: "linear-gradient(135deg, #3b82f6, #1a56db)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(26,86,219,0.35)",
    letterSpacing: "-0.1px",
  },
  btnInner: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};
