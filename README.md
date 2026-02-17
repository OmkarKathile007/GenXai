# 🚀 GenXai
### One Platform. Endless AI Possibilities.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?logo=vercel)](https://genxai-psi.vercel.app)
![Java](https://img.shields.io/badge/Java-Spring%20Boot-green?logo=springboot)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)

### Landing Page
![Landing Page](App/public/images/landing.png)
### Main 
![Landing Page](App/public/images/genxhub.png)
### Text Summarizer
![Text Summarizer](App/public/images/summarize.png)
### Roadmap Home
![Roadmap1](App/public/images/roadmp1.png)
### Roadmap Result
![Roadmap2](App/public/images/roadmap.png)
### Code Converter
![codeconvert](App/public/images/code.png)
*(The modern Bento Grid interface connecting all AI tools)*

---

## 📖 Table of Contents
1. [What is GenXai?](#-what-is-genxai)
2. [How It Works (Backend Engineering)](#-how-it-works-backend-engineering)
3. [Key Features](#-key-features)
4. [Tech Stack](#-tech-stack)
5. [Architecture & Flow](#-architecture--flow)
6. [Project Structure](#-project-structure)
7. [Installation](#-installation)

---

## 💡 What is GenxAI?

**GenxAI** is a unified AI-driven productivity platform built for performance and scalability. It aggregates 6+ advanced AI tools including code conversion, roadmap generation, and email writing into a single, modern dashboard.

Unlike simple API wrappers, **GenXai handles high-latency AI tasks asynchronously**. We engineered a custom backend architecture that processes heavy workloads in the background, ensuring the user interface remains responsive and never freezes, even when the AI takes 10+ seconds to generate a response.

---

## ⚙️ How It Works (Backend Engineering)

We implemented an **Event-Driven Architecture** using Spring Boot to optimize performance on resource-constrained environments (like Render Free Tier).

### 1. The "Ticket" System (Async Job Queue)
Direct HTTP calls to LLMs can time out browsers. We solved this with **Spring Boot `@Async`**.
* **The Problem:** AI models (like Gemini) take 5-15 seconds to reply. Blocking the HTTP thread destroys user experience.
* **The Solution:** When a user submits a request, the Controller immediately returns a **Job ID** (HTTP 202 Accepted).
* **The Worker:** A background thread picks up the job, processes the AI logic, and updates the database.
* **The Result:** The frontend polls for status updates, ensuring a non-blocking, reactive UI.

### 2. Smart "Personas" (Database-Driven Prompts)
AI models often "hallucinate" or add conversational fluff (e.g., *"Here is your code!"*), which breaks strict parsers.
* **The Solution:** We store system prompts in a PostgreSQL database, not hardcoded in Java.
* **Dynamic Tuning:** For the Code Converter, we enforce a **"Headless Compiler"** persona that outputs raw code only.
* **Benefit:** We can patch AI behavior instantly by updating the database record without redeploying the backend.

### 3. Secure Access (JWT)
* The API is secured using **Spring Security with JWT (JSON Web Tokens)**.
* Stateless authentication ensures scalability across distributed container instances.

---

## 🛠 Key Features

- **⚡ Code Converter:** Translates code between languages (e.g., Python ⇄ Java) with 100% syntax accuracy.
- **🗺️ Career Roadmap Generator:** Creates detailed, week-by-week learning paths for any technology.
- **📧 Cold Email Writer:** Generates professional, context-aware emails for job applications or outreach.
- **📝 Text Summarizer:** Condenses long technical papers into key bullet points.
- **💼 Cover Letter Builder:** Tailors professional cover letters based on resume snippets.
- **✨ Text Improver:** Refines grammar and tone for professional communication.

---

## 💻 Tech Stack

### Backend (The Brain)
- **Framework:** Java Spring Boot 3
- **Database:** PostgreSQL, Neon DB (Jobs, Prompts, Users)
- **Security:** Spring Security + JWT
- **Architecture:** Async/Await Pattern, Event-Driven
- **AI Integration:** Google Gemini API
- **DevOps:** Docker, Render

### Frontend (The Face)
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS, Shadcn UI
- **Deployment:** Vercel

---

## 🏗 Architecture & Flow

```mermaid
flowchart TD
    %% Client Layer
    UI[React/Next.js Frontend]
    
    %% Security Layer
    CORS[CORS Filter]
    JWT[JWT Auth Filter]
    SEC[Spring Security]
    
    %% Controllers
    AUTH_C[Auth Controller]
    AI_C[AI Controller]
    ROADMAP_C[Roadmap Controller]
    
    %% Services
    AUTH_S[Auth Service]
    JOB_S[Job Service]
    AI_S[AI Service]
    PROMPT_S[Prompt Service]
    ROADMAP_S[Roadmap Service]
    WORKER[Job Worker - Async]
    
    %% Repositories
    USER_R[(User Repository)]
    JOB_R[(Job Repository)]
    PROMPT_R[(Prompt Repository)]
    ROADMAP_R[(Roadmap Repository)]
    
    %% Database
    DB[(PostgreSQL Database)]
    
    %% External
    GEMINI[Google Gemini API]
    
    %% Main Flow
    UI -->|1. HTTP Request| CORS
    CORS -->|2. Validate| JWT
    JWT -->|3. Check Token| SEC
    SEC -->|4. Route Request| AUTH_C
    SEC -->|4. Route Request| AI_C
    SEC -->|4. Route Request| ROADMAP_C
    
    %% Auth Flow
    AUTH_C -->|5. Register/Login| AUTH_S
    AUTH_S -->|6. Query User| USER_R
    USER_R -->|7. Database Query| DB
    
    %% AI Job Flow
    AI_C -->|5. Create Job| JOB_S
    JOB_S -->|6. Save Job| JOB_R
    JOB_R -->|7. Store in DB| DB
    AI_C -->|8. Trigger Worker| WORKER
    WORKER -->|9. Process Job| AI_S
    AI_S -->|10. Get Prompt| PROMPT_S
    PROMPT_S -->|11. Query Prompts| PROMPT_R
    PROMPT_R -->|12. Fetch from DB| DB
    AI_S -->|13. Call API| GEMINI
    GEMINI -->|14. AI Response| AI_S
    AI_S -->|15. Return Result| WORKER
    WORKER -->|16. Update Job| JOB_R
    JOB_R -->|17. Save Result| DB
    
    %% Roadmap Flow
    ROADMAP_C -->|5. CRUD Operations| ROADMAP_S
    ROADMAP_S -->|6. Query/Update| ROADMAP_R
    ROADMAP_R -->|7. Persist Data| DB
    
    %% Styling
    style UI fill:#2563eb,stroke:#1e40af,color:#fff
    style CORS fill:#10b981,stroke:#059669,color:#fff
    style JWT fill:#10b981,stroke:#059669,color:#fff
    style SEC fill:#10b981,stroke:#059669,color:#fff
    style AUTH_C fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style AI_C fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style ROADMAP_C fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style AUTH_S fill:#f59e0b,stroke:#d97706,color:#fff
    style JOB_S fill:#f59e0b,stroke:#d97706,color:#fff
    style AI_S fill:#f59e0b,stroke:#d97706,color:#fff
    style PROMPT_S fill:#f59e0b,stroke:#d97706,color:#fff
    style ROADMAP_S fill:#f59e0b,stroke:#d97706,color:#fff
    style WORKER fill:#ef4444,stroke:#dc2626,color:#fff
    style USER_R fill:#6366f1,stroke:#4f46e5,color:#fff
    style JOB_R fill:#6366f1,stroke:#4f46e5,color:#fff
    style PROMPT_R fill:#6366f1,stroke:#4f46e5,color:#fff
    style ROADMAP_R fill:#6366f1,stroke:#4f46e5,color:#fff
    style DB fill:#0ea5e9,stroke:#0284c7,color:#fff
    style GEMINI fill:#ec4899,stroke:#db2777,color:#fff
```



This sequence diagram illustrates the **Async Polling Pattern** used to decouple the frontend from high-latency AI operations.
