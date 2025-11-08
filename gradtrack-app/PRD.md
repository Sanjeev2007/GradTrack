# 🧠 GradTrack — Updated Product Requirements Document (PRD)

**Version:** 2.0

**Owner:** Sanjeev Raja

**Date:** November 2025

**Stage:** Active Build (AI-Augmented Solo Dev Mode)

---

## 🎯 Product Overview

GradTrack is an **AI-powered productivity assistant** for Computer Science college students that acts as a **personal academic brain**. It helps users plan study schedules, track progress, and optimize their time using real data from Google Calendar, Toggl, and personal goals.

GradTrack combines a **ChatGPT-style conversational interface** with **visual analytics** (charts, tables, and progress widgets). It reasons about workload and deadlines to generate adaptive, intelligent schedules.

### 🧩 Vision

To become the **AI co-pilot for student life** — automating planning, analyzing habits, and offering smart guidance based on real academic data.

> “Focus on studying, not planning.”
> 

---

## 👤 User Persona

**Name:** Typical CS Student

**Age:** 17–23

**Profile:** B.Tech / B.Sc Computer Science student juggling coursework, projects, and personal study.

**Pain Points:**

- Overwhelmed by multiple subjects, projects, and exams.
- Struggles to plan efficient study schedules.
- Uses multiple disconnected tools (Calendar, Toggl, Notion, etc.).

**Goals:**

- Understand where their time is going.
- Balance coursework with self-study (DSA, projects, etc.).
- Receive AI-driven weekly/daily plans.
- Build sustainable academic consistency.

---

## 🧠 Core Value Proposition

GradTrack gives students a **smart planning layer** on top of their existing tools. It:

1. Reads data from **Google Calendar** and **Toggl Track**.
2. Analyzes study distribution and free time.
3. Generates AI-driven weekly plans.
4. Shows progress visually (inline charts & tables).
5. Sends automatic summaries and nudges.

---

## 💬 Primary User Flows

### 1. **Weekly Planning**

- User types: “Plan my week — I have an OS quiz and DBMS assignment.”
- Backend fetches Calendar + Toggl.
- LLM generates structured reply + visuals.
- User sees text, bar chart (hours per subject), and suggested study sessions.

### 2. **Progress Review**

- User types: “Show my progress this week.”
- GradTrack displays progress cards: “DSA 6/8h done”, “DBMS 4/5h done”.
- Suggests course corrections.

### 3. **Automation (via n8n)**

- Every night at 9 PM, n8n triggers summary job.
- GradTrack fetches updated data → generates summary JSON → sends to Telegram.

### 4. **Action Shortcuts (via Raycast)**

- Commands like `/gradtrack plan today` or `/gradtrack log 2h DSA` run locally.

---

## 🧩 Core Features (MVP)

| Category | Feature | Description |
| --- | --- | --- |
| **Chat Interface** | Conversational UI | GPT-like chat that supports both text and visuals |
| **Visuals** | Inline charts/tables | JSON-driven charts for study hours, goals, deadlines |
| **Integrations** | Calendar & Toggl | Sync academic events and study logs |
| **AI Planning** | Weekly/daily planning | Suggest optimal sessions and schedules |
| **Goal Tracking** | Per-subject study goals | Track completion vs. target |
| **Automation** | Daily/weekly summaries | n8n triggers reports & reminders |
| **Notifications** | Telegram or Discord | Push summaries and nudges |

---

## ⚙️ System Architecture

### Frontend (Next.js + React)

- Chat interface (Shadcn UI + Tailwind)
- Inline renderer (Recharts + Cards)
- Message streaming + JSON parsing
- Authentication (Clerk / NextAuth)

### Backend (Node.js + Python Agent)

- Node.js API layer for frontend
- Python (LangChain / CrewAI) reasoning agent
- Supabase DB for persistence
- n8n orchestrations for automations

### Integrations

- Google Calendar API (read/write)
- Toggl Track API
- Telegram Bot / Discord Webhooks

---

## 🤖 AI Reasoning Stack

| Layer | Model | Purpose |
| --- | --- | --- |
| **Reasoning Agent** | GPT-5 / GPT-4o | Generate plans, analyze data |
| **Code/Logic Assistant** | Claude Code | Write backend logic, LangChain pipelines |
| **Research/Knowledge** | Perplexity | Fetch factual data for subjects |
| **Automation/Memory** | n8n | Trigger, schedule, and sync tasks |

Prompt Template Example:

```
You are an AI study planner. Given:
- Calendar events
- Toggl logs
- Study goals
Return:
1. A short text summary (<120 words)
2. A visual JSON payload with charts, cards, and tables.
3. Optional calendar actions.

```

---

## 🧰 Tooling & Dev Workflow (AI-Augmented)

| Role | Tool | Use |
| --- | --- | --- |
| Coding | Claude Code + Warp | Backend, prompt engineering, deployment |
| Prototyping | Replit | Rapid backend & UI tests |
| Management | Linear + Superhuman | Tasks, updates, and communication |
| Design | Magic Patterns + Mobbin + Gamma | UI generation, inspiration, and decks |
| Automation | n8n + Raycast + Wispr Flow | Workflows, local commands, reminders |
| Research | Perplexity | Live knowledge grounding |

---

## 📊 Success Metrics

| Metric | Goal |
| --- | --- |
| Active Users (DAU) | 50+ in MVP launch |
| Weekly Retention | 70%+ |
| Avg Study Time Logged | 15+ hours/week |
| Goal Completion Rate | 80% |
| User Satisfaction | >4.5/5 |

---

## 🧭 Roadmap (Solo Dev + AI Co-Dev Plan)

### **Phase 1 – Core Prototype (Weeks 1–3)**

- Build chat UI (Next.js + Tailwind)
- Create `/api/agent/chat` endpoint
- Mock backend reply (visual JSON)

### **Phase 2 – Smart Agent Integration (Weeks 4–7)**

- Add Google Calendar + Toggl APIs
- Claude + GPT prompt pipeline
- Bar/Donut chart visuals

### **Phase 3 – Automation Layer (Weeks 8–11)**

- n8n summary & reminder flows
- Telegram notifications
- Supabase data sync

### **Phase 4 – UX Polish (Weeks 12–14)**

- Shadcn + Magic Patterns UI upgrade
- Add progress dashboard
- Create video demo with Descript

---

## 🧩 Future Enhancements

- Subject-specific tutoring via context-based LLM prompts
- Flashcard generation from notes
- Burnout detection via time trend analysis
- Career insights (“You’ve focused 40% on ML — consider Kaggle challenges”)

---

## ✅ Key Principles

- **Minimalism:** Simple, focused UI.
- **Automation:** AI handles routine planning.
- **Context-awareness:** Learns user patterns over time.
- **Adaptability:** Works seamlessly with any student schedule.

---

**Next Step:** Confirm which milestone to start with — *Frontend chat MVP* or *Agent backend + API integration*. Once chosen, we’ll break it into a week-by-week build roadmap with deliverables.