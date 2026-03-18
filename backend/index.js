const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bits-student-hub-frontend.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "BIT Student Hub API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
