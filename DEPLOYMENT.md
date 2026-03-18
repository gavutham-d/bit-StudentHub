# BITS Student Hub — Deployment Guide

This guide covers deploying the project to **Render** (recommended — free tier), with notes for local setup and environment configuration.

---

## 📁 Monorepo Structure

```
BITS-Student-Hub/        ← Git repository root
├── frontend/            ← React + Vite (Static Site on Render)
├── backend/             ← Node.js + Express (Web Service on Render)
├── render.yml           ← Render Blueprint (auto-deploys both services)
└── .gitignore
```

---

## 🚀 Deploy to Render (Recommended)

### Prerequisites
- A [Render](https://render.com) account (free)
- Your project pushed to a **GitHub** or **GitLab** repository

---

### Step 1 — Push to GitHub

```bash
# From the BITS-Student-Hub root directory
git init
git add .
git commit -m "Initial commit — BITS Student Hub"

# Create a repo on GitHub, then:
git remote add origin https://github.com/<your-username>/BITS-Student-Hub.git
git branch -M main
git push -u origin main
```

---

### Step 2 — Deploy via Render Blueprint

1. Go to [https://render.com](https://render.com) and log in.
2. Click **"New +"** → **"Blueprint"**.
3. Connect your GitHub account and select the `BITS-Student-Hub` repository.
4. Render will detect `render.yml` automatically and provision:
   - **bits-student-hub-backend** → Express API (Web Service)
   - **bits-student-hub-frontend** → React build (Static Site)
5. Click **"Apply"** — both services will build and deploy.

> ✅ No manual configuration needed. `render.yml` handles everything.

---

### Step 3 — Set the API URL in Frontend

After the backend deploys, Render gives it a live URL like:
```
https://bits-student-hub-backend.onrender.com
```

You need to tell the frontend where the API lives.

#### Option A — Render Environment Variable (Recommended)
1. In Render dashboard → **bits-student-hub-frontend** → **Environment**.
2. Add:
   ```
   VITE_API_URL = https://bits-student-hub-backend.onrender.com
   ```
3. Trigger a manual redeploy of the frontend.

#### Option B — Update `vite.config.js` proxy (local dev only)
The existing proxy in `vite.config.js` already handles this for local development — no change needed locally.

---

### Step 4 — Update Frontend API Calls for Production

In `frontend/src/pages/LoginPage.jsx` (and any future API calls), update the fetch URL to use the environment variable:

```js
const API_BASE = import.meta.env.VITE_API_URL || "";

const res = await fetch(`${API_BASE}/api/auth/login`, { ... });
```

Repeat this pattern for `/api/auth/logout` and `/api/auth/verify`.

---

## 🌐 Live URLs After Deployment

| Service   | URL Pattern                                          |
|-----------|------------------------------------------------------|
| Frontend  | `https://bits-student-hub-frontend.onrender.com`    |
| Backend   | `https://bits-student-hub-backend.onrender.com`     |
| API Health| `https://bits-student-hub-backend.onrender.com/api/health` |

---

## 💻 Local Development

### Backend
```bash
cd backend
npm install
npm start
# → http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `localhost:3000` automatically via `vite.config.js`. No CORS issues in local dev.

---

## ❓ Do I Need an .env File to Deploy?

**Short answer: No — not for the current mock setup.**

This project uses mock data (no real database, no secret API keys). The only value that changes between local and production is the backend URL the frontend calls.

| Scenario | Needs .env? | What to do |
|---|---|---|
| Local development | No | Vite proxy in `vite.config.js` handles it automatically |
| Render deployment | One env var | Set `VITE_API_URL` in Render dashboard (see Step 3) |
| Future: real DB | Yes | Add `DATABASE_URL`, `JWT_SECRET` etc. to backend `.env` |

The `.gitignore` files already exclude `.env` so you are safe to add one later without accidentally committing secrets.

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`) — optional overrides
```env
PORT=3000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`) — for local dev
```env
VITE_API_URL=http://localhost:3000
```

### Frontend (`frontend/.env.production`) — for production build
```env
VITE_API_URL=https://bits-student-hub-backend.onrender.com
```

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

---

## 🛠 Manual Render Setup (Alternative to Blueprint)

If you prefer to configure services manually instead of using `render.yml`:

### Backend Service
| Field          | Value                        |
|----------------|------------------------------|
| Type           | Web Service                  |
| Environment    | Node                         |
| Root Directory | `backend`                    |
| Build Command  | `npm install`                |
| Start Command  | `npm start`                  |
| Port           | `3000`                       |

### Frontend Service
| Field               | Value            |
|---------------------|------------------|
| Type                | Static Site      |
| Root Directory      | `frontend`       |
| Build Command       | `npm install && npm run build` |
| Publish Directory   | `dist`           |
| Rewrite Rule        | `/* → /index.html` |

---

## ⚡ Free Tier Notes (Render)

- Free web services **spin down after 15 minutes of inactivity**. The first request after idle may take ~30 seconds to wake up.
- To avoid cold starts, consider using [UptimeRobot](https://uptimerobot.com) to ping your backend URL every 14 minutes for free.
- Free static sites have **no sleep limitation** — the frontend is always fast.
