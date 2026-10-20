<div align="center">

  <img src="public/images/team/hero-shield-badge.png" alt="Cyber Cell SATI Vidisha Shield Logo" width="160" />

  # 🛡️ CYBER CELL — SATI VIDISHA
  ### Official Cybersecurity Club • Central Coding Club Wing
  **Samrat Ashok Technological Institute (SATI), Vidisha (M.P.), India**

  <p align="center">
    <i>"Think Secure. Build Better."</i>
  </p>

  [![Live Portal](https://img.shields.io/badge/Live_Portal-cyber--cell.vercel.app-00e5ff?style=for-the-badge&logo=vercel&logoColor=black)](https://cyber-cell.vercel.app)
  [![GitHub Repo](https://img.shields.io/badge/GitHub-yashharfode%2FCyber--Cell--Official--Website-white?style=for-the-badge&logo=github&logoColor=black)](https://github.com/yashharfode/Cyber-Cell-Official-Website)
  [![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![Firebase](https://img.shields.io/badge/Firebase-v12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)

  <br />

  [🌐 Explore Website](https://cyber-cell.vercel.app) • [🎓 Verify Certificate](https://cyber-cell.vercel.app/verify) • [🎛️ Admin Panel](https://cyber-cell.vercel.app/admin) • [👥 Meet the Team](https://cyber-cell.vercel.app/team) • [🎯 8 Security Domains](https://cyber-cell.vercel.app/domains) • [🗺️ 9-Stage Roadmap](https://cyber-cell.vercel.app#roadmap) • [📥 Join Offline](https://cyber-cell.vercel.app/join)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [System Architecture & Capabilities](#-system-architecture--capabilities)
- [Certificate Studio & Verification Engine](#-certificate-studio--verification-engine)
- [Enterprise Security & Route Protection](#-enterprise-security--route-protection)
- [Key Features](#-key-features)
- [8 Security Focus Domains](#-8-security-focus-domains)
- [Interactive Web Terminal](#-interactive-web-terminal)
- [9-Stage Student Learning Roadmap](#-9-stage-student-learning-roadmap)
- [Leadership & Governance](#-leadership--governance)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started Locally](#-getting-started-locally)
- [Environment Variables](#-environment-variables)
- [Production Deployment](#-production-deployment)
- [Recruitment & Membership](#-recruitment--membership)
- [Contributing](#-contributing)
- [License & Acknowledgements](#-license--acknowledgements)

---

## 🌐 Overview

**Cyber Cell** is the premier student cybersecurity body and ethical defense initiative operating under the **Central Coding Club** at **Samrat Ashok Technological Institute (SATI), Vidisha**.

Our platform serves as both the club's official public gateway and an integrated institutional operations portal featuring:
1. **Public Community Portal**: Syllabi across 8 security domains, live web terminal, event timelines, and student roadmap.
2. **Admin Command Center (`/admin`)**: Operations telemetry, attendees registry, and certificate studio gateway.
3. **Admin Certificate Studio (`/admin/certificates`)**: Custom Canva template generator, curated font engine, Excel parser, and on-demand issuance.
4. **Public Verification & HD Download Portal (`/verify`)**: Zero-storage, instant high-resolution credential verification and 1920×1080 PNG download.

```
       ┌────────────────────────────────────────────────────────┐
       │          CENTRAL CODING CLUB — SATI VIDISHA            │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │             CYBER CELL CORE INITIATIVE                 │
       │                                                        │
       │  [ Faculty Advisory ] ── Prof. Shivangi Jain (CSE)     │
       │  [ Convenor & Founder ] ── Yash Harfode                │
       │  [ Co-Convenor ] ── Krishna Mishra                     │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
   [ Tech Ops ]           [ Media & Creative ]       [ Management ]
  Anubhav Vishwkarma       Abhishek Mahore            Ansh Kushwaha
  (Tech Team Head)         (Media Head)               (Management Head)
                           Arya Mishra                Medhavi Sharma
                           (Design Head)              (Docs & Outreach Head)
```

---

## 🎓 Certificate Studio & Verification Engine

The platform includes a **Zero-Storage On-Demand Canvas Certificate Architecture**, eliminating expensive cloud storage and bandwidth costs while guaranteeing lifetime permanent authenticity.

```
                           ┌───────────────────────────┐
                           │   Organizer / Admin       │
                           │   (/admin/certificates)   │
                           └─────────────┬─────────────┘
                                         │
                         ┌───────────────┴───────────────┐
                         ▼                               ▼
                 [ Canva Template ]              [ Excel Sheet ]
              5 MB PNG/JPG background         Names & Scholar Numbers
                         │                               │
                         └───────────────┬───────────────┘
                                         │
                                         ▼
                     ┌───────────────────────────────────────┐
                     │   Visual Typography & Font Studio     │
                     │  Cinzel, Pinyon Script, Great Vibes   │
                     │  Precision X/Y Position & Color Picker│
                     └───────────────────┬───────────────────┘
                                         │
                                         ▼
                     ┌───────────────────────────────────────┐
                     │   Saved Configuration (Server)        │
                     │   data/certificateConfig.json         │
                     └───────────────────┬───────────────────┘
                                         │
                       ┌─────────────────┴─────────────────┐
                       ▼                                   ▼
          ┌─────────────────────────┐         ┌─────────────────────────┐
          │  Public Search (/verify)│         │ Institutional Ledger    │
          │  Enter Scholar No / Name│         │ Permanent Verification  │
          └────────────┬────────────┘         └─────────────────────────┘
                       │
                       ▼
          ┌─────────────────────────┐
          │   HTML5 Canvas Render   │
          │  0.1s On-Demand HD PNG  │
          │ 1920x1080 Direct Export │
          └─────────────────────────┘
```

### Key Advantages:
* **0 MB Cloud Storage Required**: Zero external cloud storage dependencies, no cards, and zero billing overhead.
* **Name-Only Canva Mode**: Preserves 100% of the Canva template's borders, logos, and signatures; only writes the recipient's name at configured coordinates.
* **8 Curated Typography Styles**: Choose between Academic Serif (`Cinzel`), Royal Calligraphy (`Pinyon Script`, `Great Vibes`), Editorial Luxury (`Playfair Display`), or Modern Sans (`Montserrat`).
* **Direct Server Persistence**: Templates uploaded via the admin studio are permanently written to `public/templates/certificate-template.png` and tracked in Git.
* **Hybrid Data Registry**: Dynamically loads and merges local Excel spreadsheets (`data/attendees.xlsx`) and Cloud Firestore records.

---

## 🔒 Enterprise Security & Route Protection

The website implements defense-in-depth security to ensure no unauthorized access or vulnerabilities:

| Layer | Implementation | Details |
| :--- | :--- | :--- |
| **Server-Side Route Interception** | `middleware.ts` | All `/admin/*` and `/api/admin/*` endpoints strictly require a valid admin session cookie before route execution. |
| **Environment Password Guard** | `ADMIN_PASSWORD` | Access password is stored securely in environment variables (`.env.local`) and never hardcoded in source. |
| **Session Security** | HTTP-Only Cookies | Session cookies are set with `HttpOnly: true`, `SameSite: Lax`, and `Secure: true` in production to prevent XSS theft. |
| **Upload Validation & Magic Bytes** | Buffer Inspection | Template uploads check magic file headers (`0x89504E47` for PNG, `0xFFD8FF` for JPEG) to prevent disguised executable uploads. |
| **Offline Resilience** | Firestore Fallback | All database operations gracefully fall back to local session caches or local Excel sheets if network drops. |
| **Git Leak Prevention** | Strict `.gitignore` | Environment files (`.env*`) and sensitive local caches are strictly excluded from commits. |

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🎛️ Admin Command Center** | Dedicated `/admin` dashboard featuring real-time telemetry, loaded attendees count, active template status, and quick shortcuts. |
| **🎓 Canva Certificate Studio** | Interactive `/admin/certificates` studio with live 16:9 canvas preview, font selector, position nudgers, and Excel parser. |
| **🔍 Public Verification Portal** | Responsive `/verify` registry supporting searches by Scholar Number, Certificate ID, or Name with instant 1920×1080 HD download. |
| **💻 Interactive Web CLI** | Built-in simulated educational Unix terminal supporting commands like `about`, `domains`, `roadmap`, `team`, `flag`, and `clear`. |
| **🛡️ 8 Deep Security Domains** | Curated syllabi, tools, industry frameworks (OWASP, MITRE ATT&CK, NIST), and practical prerequisites. |
| **🗺️ 9-Stage Student Roadmap** | Progressive path from Computer Fundamentals and Networking to Offensive CTFs and Career Specialization. |
| **📚 Curated Resource Vault** | Verified learning links for PortSwigger Academy, TryHackMe, OverTheWire Bandit, Linux Journey, and MITRE. |
| **🔐 Role-Based Auth (Firebase)** | Clean user authentication supporting member and student profiles with Firebase Auth. |
| **👥 Institutional Team Directory** | Official roster featuring Faculty Advisory, Founder & Convenor, Executive Committee, and Core Department Heads. |
| **📢 Offline Recruitment Guide** | Transparent multi-round on-campus induction process replacing online forms with physical evaluation. |
| **⚡ Edge-Optimized Next.js 16** | Next.js App Router with Turbopack, Tailwind CSS 4, and instant page rendering. |

---

## 🎯 8 Security Focus Domains

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     CYBER CELL SECURITY DOMAINS                         │
├──────────────────────────┬──────────────────────────┬───────────────────┤
│ 01. Ethical Hacking      │ 02. Network Security     │ 03. Web Security  │
│ Penetration testing,     │ Packet analysis, Wireshark,│ OWASP Top 10,   │
│ vulnerability assessment,│ firewalls, IDS/IPS, VPNs │ XSS, SQLi, CSRF,  │
│ privilege escalation     │ & network architecture   │ authentication    │
├──────────────────────────┼──────────────────────────┼───────────────────┤
│ 04. Malware Analysis     │ 05. Digital Forensics    │ 06. CTFs & Labs   │
│ Static/dynamic triage,   │ Autopsy, Volatility, disk│ Jeopardy & Attack-│
│ Ghidra, x64dbg, sandboxing│ image analysis, timeline│ Defense, crypto,  │
│ & behavioral tracking    │ reconstruction           │ stego, pwn, web   │
├──────────────────────────┴──────────────────────────┴───────────────────┤
│ 07. Security Awareness & Campus Defense                                 │
│ Anti-phishing drives, campus hygiene workshops & threat briefings       │
├─────────────────────────────────────────────────────────────────────────┤
│ 08. Career, Certifications & DevSecOps                                  │
│ CEH, OSCP, CompTIA Security+, SecOps pipelines, compliance standards    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Interactive Web Terminal

Visitors can interact with our simulated terminal directly on the homepage:

```bash
$ help
Available simulated commands:
  about     : Learn about Cyber Cell SATI
  domains   : Explore 8 core security domains
  events    : View official event status
  team      : View organizational structure
  roadmap   : View 9-stage student roadmap
  resources : Inspect verified learning links
  flag      : Discover the hidden flag
  clear     : Clear terminal screen

$ flag
FLAG FOUND: CYBER{THINK_SECURE_BUILD_BETTER}
```

---

## 🗺️ 9-Stage Student Learning Roadmap

```mermaid
flowchart LR
    A["01. Computer Fundamentals"] --> B["02. Computer Networks"]
    B --> C["03. Linux & CLI Mastery"]
    C --> D["04. Scripting (Python/Bash)"]
    D --> E["05. Web Architecture"]
    E --> F["06. Cyber Foundations"]
    F --> G["07. Hands-on Security Labs"]
    G --> H["08. CTFs & Wargames"]
    H --> I["09. Domain Specialization"]

    style A fill:#091322,stroke:#00e5ff,stroke-width:2px,color:#fff
    style C fill:#091322,stroke:#00e5ff,stroke-width:2px,color:#fff
    style F fill:#091322,stroke:#38bdf8,stroke-width:2px,color:#fff
    style H fill:#091322,stroke:#818cf8,stroke-width:2px,color:#fff
    style I fill:#091322,stroke:#c084fc,stroke-width:2px,color:#fff
```

1. **Computer Fundamentals**: Architecture, OS internals, processes, threads, memory layouts.
2. **Computer Networks**: OSI Model, TCP/IP, DNS, DHCP, routing, subnets, packet structures.
3. **Linux & CLI**: Filesystem hierarchy, permissions, process management, shell pipelines, bash scripting.
4. **Programming**: Python for security scripts, sockets, regex, data structures, Bash automation.
5. **Web Architecture**: HTTP/HTTPS, REST APIs, headers, cookies, sessions, browser DOM, backend flows.
6. **Cybersecurity Foundations**: CIA triad, cryptography basics, hashing, symmetric/asymmetric ciphers, threat modeling.
7. **Hands-on Security Labs**: Nmap, Wireshark, Burp Suite, Metasploit, PortSwigger Web Security Academy.
8. **CTFs & Wargames**: OverTheWire Bandit, PicoCTF, TryHackMe rooms, HackTheBox machines.
9. **Specialization**: Cloud Security, Reverse Engineering, Red Teaming, Digital Forensics, DevSecOps.

---

## 👥 Leadership & Governance

### Faculty Advisory
* **Prof. Shivangi Jain** — *Faculty Advisor & Mentor*
  - Department of Computer Science & Engineering, SATI Vidisha
  - Institutional compliance, ethics, academic guidance, and student research mentorship

### Leadership & Executive Committee
* **Yash Harfode** — *Founder & Convenor*
  - Spearheads the club's strategy, technical curriculum, community, and training tracks
* **Krishna Mishra** — *Co-Convenor*
  - Club operations, cross-domain coordination, logistics, and student affairs

### Core Operations Heads
* **Anubhav Vishwkarma** — *Tech Team Head* (Infrastructure, CTF platforms, developer resources)
* **Abhishek Mahore** — *Media & Photography Head* (Media production, documentation, visual coverage)
* **Arya Mishra** — *Graphic Designer Head* (Brand identity, UI/UX, promotional graphics)
* **Ansh Kushwaha** — *Management & Volunteers Head* (Event coordination, venue, volunteer squads)
* **Medhavi Sharma** — *Documentation & Anchoring Head* (Reports, stage anchoring, student liaison)

---

## 🛠️ Tech Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                    │
│   Next.js 16 (Turbopack) • React 19 • Tailwind CSS 4   │
│   Lucide Icons • Geist & Google Certificate Fonts      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               SECURITY & ROUTE GATEWAY                 │
│   Next.js Middleware • HTTP-Only Cookie Sessions       │
│   Role-Based Guards • Magic Byte File Upload Validator │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   DATA & IDENTITY LAYER                │
│   Local Excel Auto-Parser (xlsx) • Cloud Firestore     │
│   Firebase Authentication • On-Demand Canvas Renderer  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                 │
│   Vercel Edge Network • Zero-Storage On-Demand Engine  │
│   Automatic CI/CD from GitHub Main Branch              │
└────────────────────────────────────────────────────────┘
```

- **Frontend Core**: Next.js `16.3.4` (App Router) with React `19.2.8`
- **Styling**: Tailwind CSS `v4` with `@tailwindcss/postcss`
- **Design Language**: Cyber executive theme (`#06080d`), neon cyan accents (`#00e5ff`), gold certificates
- **Authentication**: Master Admin Password (`.env.local`) + Firebase Auth
- **Database**: Hybrid (Local `data/attendees.xlsx` + Cloud Firestore)
- **Icons & Graphics**: Lucide React + HTML5 1920×1080 Canvas Engine
- **Deployment**: Vercel Global Edge Network with continuous GitHub integration

---

## 📂 Project Directory Structure

```text
Cyber-Cell/
├── app/
│   ├── about/                   # About Cyber Cell & SATI Coding Club
│   ├── admin/                   # Admin Command Center Dashboard
│   │   ├── certificates/        # Canva Certificate Studio & Visual Generator
│   │   ├── login/               # Master password authentication portal
│   │   └── page.tsx             # Executive admin hub overview & telemetry
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/            # Cookie session login & logout endpoints
│   │   │   ├── certificates/
│   │   │   │   ├── config/      # Typography & placement settings API
│   │   │   │   ├── issue/       # Batch issuance endpoint
│   │   │   │   ├── upload-excel/# Validated attendees spreadsheet upload
│   │   │   │   └── upload-template/ # Magic-byte validated Canva template upload
│   │   ├── certificates/
│   │   │   └── verify/          # Public verification & attendee query API

│   ├── certificates/            # Permanent redirect alias to /verify
│   ├── domains/                 # 8 Cybersecurity Focus Domain syllabi
│   ├── events/                  # Official events, workshops & status
│   ├── join/                    # Offline induction guide & recruitment process
│   ├── projects/                # Open-source tools & defensive scripts
│   ├── resources/               # Verified external security learning vault
│   ├── team/                    # Leadership, Advisory & Core Operations roster
│   ├── verify/                  # Public certificate search & HD download portal
│   ├── not-found.tsx            # Custom cyber-themed 404 handler
│   ├── layout.tsx               # Root layout with fonts, AuthProvider & modals
│   ├── page.tsx                 # Landing hero, stats, interactive shell & roadmap
│   └── globals.css              # Tailwind CSS 4 theme rules & animations
├── components/
│   ├── AuthModal.tsx            # Sign in / Register popup modal
│   ├── CyberShieldLogo.tsx      # Vector SVG brand logo badge
│   ├── CyberSplashScreen.tsx    # High-tech loading transition
│   ├── Footer.tsx               # Site footer with disclaimer & links
│   ├── Navbar.tsx               # Floating pill navigation with Certificate tab
│   ├── SpotlightCard.tsx        # Interactive mouse spotlight cards
│   ├── StairsTransition.tsx     # Smooth multi-step page transition
│   └── TerminalDemo.tsx         # Interactive client-side simulated CLI
├── context/
│   └── AuthContext.tsx          # Firebase authentication context with offline fallback
├── data/
│   ├── attendees.xlsx           # Local attendees registry spreadsheet
│   ├── certificateConfig.json   # Saved official font and coordinates configuration
│   ├── domains.ts               # Domain datasets, syllabi & toolchains
│   ├── resources.ts             # Curated resource links by category
│   └── team.ts                  # Faculty advisor, leadership & core heads data
├── lib/
│   ├── certificateRenderer.ts   # 1920x1080 HTML5 Canvas certificate renderer
│   ├── certificates.ts          # Hybrid certificate database & Excel reader
│   ├── firebase.ts              # Resilient Firebase client initialization
│   ├── firestore.ts             # User profiles & offline-safe Firestore sync
│   └── cloudinary.ts            # Cloudinary media storage & CDN client
├── middleware.ts                # Server-side route security & admin protection
├── public/
│   ├── images/                  # Shield logos, badges & member avatars
│   └── templates/               # Permanent Canva certificate template storage
├── .env.example                 # Environment configuration template
├── vercel.json                  # Framework preset configuration (Next.js)
├── next.config.ts               # Next.js configuration
├── package.json                 # Node dependencies & build scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v20.x` or `v22.x`+
- **npm**: `v9.x`+ or `pnpm` / `yarn` / `bun`
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yashharfode/Cyber-Cell-Official-Website.git
cd Cyber-Cell-Official-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy the sample environment file:
```bash
cp .env.example .env.local
```

Configure your master admin password and Firebase keys in `.env.local`:
```env
ADMIN_PASSWORD=Cybercell$123
ADMIN_SECRET_KEY=Cybercell$123
```

### 4. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
* **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Password: `Cybercell$123`)*
* **Certificate Registry**: [http://localhost:3000/verify](http://localhost:3000/verify)

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `ADMIN_PASSWORD` | Master password to access `/admin` and Certificate Studio | `Cybercell$123` |
| `ADMIN_SECRET_KEY` | Secondary fallback key for API authentication | `Cybercell$123` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `cyber-cell-d0258.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Google Cloud Project ID | `cyber-cell-d0258` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`| Cloud Storage Bucket | `cyber-cell-d0258.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| FCM Sender ID | `100344904262` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID | `1:100344904262:web:...` |
| `CLOUDINARY_URL` | Cloudinary Storage connection string | `cloudinary://<key>:<secret>@<cloud>` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `qtfezfsf` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `355444168593654` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |

---

## ☁️ Production Deployment

The project is configured for continuous zero-downtime deployment on **Vercel** / **Docker**:

- Pushes to branch `main` automatically build and deploy.
- All public pages are pre-rendered statically with instant CDN delivery.
- Dynamic route handlers (`/api/*`) run server-side with Next.js edge and node runtime.

---

## 📢 Recruitment & Membership

> [!NOTE]
> Cyber Cell does **NOT** conduct online student intake forms. Inductions are held exclusively **offline on-campus at SATI Vidisha** to ensure fairness, technical passion, and personal evaluation.

### On-Campus Selection Rounds:
1. **Round 1 — Aptitude & Cybersecurity Fundamentals**: Multiple choice + short technical scenario questions.
2. **Round 2 — Practical Problem Solving**: Hands-on Linux/Networking or domain task (for technical applicants).
3. **Round 3 — Personal Interview & Alignment**: Discussion with Faculty Advisory and Core Committee.

For complete offline induction schedules and venue guidelines, visit [/join](https://cyber-cell.vercel.app/join).

---

## 🤝 Contributing

Contributions to open-source labs, syllabi, educational writeups, and CTF challenges are always welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AddSecurityResource`)
3. Commit your changes (`git commit -m 'feat: add digital forensics cheat-sheet'`)
4. Push to the branch (`git push origin feature/AddSecurityResource`)
5. Open a Pull Request

---

## 📜 License & Acknowledgements

This project is open-source under the [MIT License](LICENSE).

- **Institution**: [Samrat Ashok Technological Institute (SATI), Vidisha](https://www.satiengg.in)
- **Parent Body**: Central Coding Club, SATI Vidisha
- **Leadership**: Yash Harfode (Founder & Convenor), Prof. Shivangi Jain (Faculty Advisor), Krishna Mishra (Co-Convenor)

<div align="center">
  <sub>Built with ❤️ and security in mind by the Cyber Cell Technical Team at SATI Vidisha.</sub><br />
  <b>© 2026 Cyber Cell. All rights reserved.</b>
</div>
