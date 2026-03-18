const express = require("express");
const router = express.Router();

// Mock user database
const mockUsers = [
  {
    id: "7376242IT232",
    name: "Arun K",
    email: "arunk.it24@bitsathy.ac.in",
    password: "arun@123",
    department: "Information Technology",
    year: "2nd Year",
    cgpa: "8.7",
    phone: "+91 98765 43210",
    avatar: "AK",
    lab: "Hackathon",
    groupId: "A#100003",
    role: "Captain",
  },
  {
    id: "7376251CS404",
    name: "Priya S",
    email: "priyas.cs25@bitsathy.ac.in",
    password: "priya@123",
    department: "Computer Science & Engineering",
    year: "1st Year",
    cgpa: "9.1",
    phone: "+91 87654 32109",
    avatar: "PS",
    lab: "Full Stack & DevOps",
    groupId: "A#100230",
    role: "Vice-Captain",
  },
  {
    id: "7376242AL155",
    name: "Monisha V",
    email: "monishav.al24@bitsathy.ac.in",
    password: "monisha@123",
    department: "Artificial Intelligence and Machine Learning",
    year: "2nd Year",
    cgpa: "8.9",
    phone: "+91 76543 21098",
    avatar: "MV",
    lab: "XR Lab",
    groupId: "A#100123",
    role: "Strategist",
  },
];

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  // Enforce institutional domain
  if (!email.endsWith("@bitsathy.ac.in")) {
    return res.status(403).json({
      success: false,
      message: "Access restricted. Only @bitsathy.ac.in email addresses are permitted.",
    });
  }

  // Find user
  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials. Please try again." });
  }

  // Return user data (excluding password)
  const { password: _, ...safeUser } = user;
  return res.status(200).json({
    success: true,
    message: "Login successful.",
    user: safeUser,
    token: `mock-jwt-token-${safeUser.id}-${Date.now()}`,
  });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  return res.status(200).json({ success: true, message: "Logged out successfully." });
});

// GET /api/auth/verify
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer mock-jwt-token-")) {
    return res.status(401).json({ success: false, message: "Invalid or missing token." });
  }
  return res.status(200).json({ success: true, message: "Token is valid." });
});

module.exports = router;
