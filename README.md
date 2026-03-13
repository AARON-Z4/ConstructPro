# ConstructPro — Construction Field Management System

A production-quality **React.js** web application for managing construction site projects and filing Daily Progress Reports (DPR). Built as a Frontend Web Developer Internship selection task.

---

## 🏗️ Project Overview

ConstructPro is a responsive web application that enables field engineers and site managers to:

- **Authenticate** securely via a login screen
- **Browse and search** active construction projects
- **File Daily Progress Reports** (DPR) with site data, weather, worker count, work descriptions, and photo uploads

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js 18 (latest stable) |
| Build Tool | Vite 6 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 |
| State Management | useState + useContext (AuthContext) |
| HTTP / Data | Mock JSON data (no backend required) |
| Typography | Google Fonts — Inter |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky top nav with breadcrumbs & user menu
│   ├── ProjectCard.jsx     # Project card with progress bar & metadata
│   ├── ImageUploader.jsx   # Drag-and-drop image upload with previews
│   ├── Toast.jsx           # Auto-dismiss toast notification
│   └── ProtectedRoute.jsx  # HOC for guarded routes
│
├── pages/
│   ├── Login.jsx           # Screen 1 — Login with glassmorphism design
│   ├── Projects.jsx        # Screen 2 — Project list with search & filter
│   └── DPRForm.jsx         # Screen 3 — Daily Progress Report form
│
├── context/
│   └── AuthContext.jsx     # Auth state, mock login, session persistence
│
├── data/
│   └── projects.js         # Mock project data (5 projects)
│
├── utils/
│   └── validation.js       # Form validation helpers
│
├── App.jsx                 # Root: BrowserRouter + route definitions
├── main.jsx                # React DOM entry point
└── index.css               # Tailwind directives + design system
```

---

## ⚡ Setup Instructions

### Prerequisites

- Node.js v18 or later
- npm v9 or later

### 1. Clone the repository

```bash
git clone https://github.com/your-username/constructpro.git
cd constructpro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 How to Run the Project

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Mock Credentials

| Field | Value |
|---|---|
| Email | `test@test.com` |
| Password | `123456` |

---

## ✅ Features Implemented

### Screen 1 — Login
- [x] Email + Password fields with client-side validation
- [x] Mock authentication (test@test.com / 123456)
- [x] Error message on wrong credentials
- [x] Loading spinner on submit
- [x] Show/hide password toggle
- [x] Session persistence via sessionStorage
- [x] Redirect to intended page after login
- [x] Dark glassmorphism card design

### Screen 2 — Project List
- [x] 5 project cards with name, status badge, location, date, manager, budget
- [x] Clickable cards → navigate to DPR form with project ID pre-filled
- [x] Color-coded status badges (Active / Delayed / Completed)
- [x] Progress bar per project
- [x] Stats strip (total / active / delayed / completed)
- [x] **Bonus:** Search by project name or location
- [x] **Bonus:** Filter by status (All / Active / Delayed / Completed)
- [x] Empty state with clear-filters button

### Screen 3 — DPR Form
- [x] Project dropdown (pre-selected from URL param)
- [x] Date picker (max = today)
- [x] Weather selector (Sunny / Cloudy / Rainy) — toggle pill buttons
- [x] Work description textarea with character counter
- [x] Worker count number input
- [x] Photo upload (1–3 images) with drag-and-drop and thumbnail previews
- [x] Remove individual uploaded photos
- [x] Full form validation with per-field error messages
- [x] Loading state on submit
- [x] Success toast notification + form reset + navigation
- [x] Sectioned layout with section numbers

### General
- [x] Protected routes (redirect to login if unauthenticated)
- [x] AuthContext with session persistence
- [x] Responsive layout (mobile 375px → tablet 768px → desktop 1280px+)
- [x] No horizontal scroll on any screen size
- [x] Sticky navigation bar
- [x] Keyboard accessible (Enter/Space on cards)
- [x] ARIA labels and roles throughout
- [x] Smooth animations (fade-in, slide-up)

---

## 🎨 Design Highlights

- **Dark glassmorphism** login page
- **SaaS dashboard** aesthetic for project pages
- Inter font family via Google Fonts
- Custom Tailwind tokens (card shadow, primary palette, animations)
- Status-specific color systems
- Hover micro-animations on all interactive elements

---

## 🌐 Deployment on Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy** ✓

---

## ⚠️ Known Limitations

- **No real backend** — All data is mocked. Authentication uses hardcoded credentials only.
- **Images are not persisted** — Photo uploads exist only in component memory and are lost on navigation/refresh.
- **No real-time updates** — Project data is static JSON; no WebSocket or polling.
- **Single user** — Multi-user / role-based access control is not implemented.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

MIT © 2026 ConstructPro
