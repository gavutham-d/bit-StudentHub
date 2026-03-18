# BIT Student Hub

A centralized full-stack portal for BIT Sathy students to securely log in and access college features from a single, modern interface.

## 📁 Project Structure

```
BIT-Student-Hub/
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/       # Sidebar, Header
│   │   ├── pages/            # Login, Dashboard, Resources, Aptitude, Profile
│   │   ├── App.jsx           # Router, auth state, route protection
│   │   ├── index.css         # Design system & global styles
│   │   └── main.jsx          # React DOM entry
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                  # Node.js + Express Backend
    ├── routes/
    │   └── auth.js           # /login, /logout, /verify endpoints
    ├── index.js              # Server entry, middleware setup
    └── package.json
```

## ✨ Features

- **Secure Institutional Login** — Only `@bitsathy.ac.in` emails are accepted
- **Dashboard** — Stats, quick links, announcements
- **Resources Directory** — Floating cards for Reward Points, Wiki, BIP, PS Portal, and more
- **Aptitude Hub** — Quant, Logical Reasoning, Verbal questions with reveal-answer
- **Profile Page** — Academic details and sign-out
- **Protected Routes** — Redirect to login if unauthenticated

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, React Router DOM    |
| UI Icons  | Lucide React                        |
| Styling   | Custom CSS (design system variables)|
| Backend   | Node.js, Express.js, CORS           |
| Auth      | localStorage session persistence    |

## 🚀 Getting Started

### Step 1 — Start the Backend

```bash
cd backend
npm install
npm start
```

> API will run on **http://localhost:3000**

### Step 2 — Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

> App will be available at **http://localhost:5173**

## 🔑 Demo Credentials

| Email                          | Password      |
|--------------------------------|---------------|
| arunk.it24@bitsathy.ac.in          | arun@123 |
| priyas.cs25@bitsathy.ac.in         | priya@123   |
| monishav.al24@bitsathy.ac.in       | monisha@123   |

## 📡 API Endpoints

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| POST   | /api/auth/login      | Authenticate with email & password |
| POST   | /api/auth/logout     | End the session                    |
| GET    | /api/auth/verify     | Validate Bearer token              |
| GET    | /api/health          | Server health check                |
