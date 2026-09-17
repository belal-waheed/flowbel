# Flowbel

Flowbel is an open-source personal finance companion and practical decision playbook application built with React 19, TypeScript, and Tailwind CSS v4 for university students and young professionals to solve budget depletion and volatile everyday transactions. It combines a customizable weekly envelope budgeting engine with a configurable cooling-off lock for discretionary spending and structured cultural decision protocols.

The application operates on a zero-cloud, local-first paradigm with 100% on-device IndexedDB persistence, guaranteeing complete financial privacy without analytics, cookies, or remote databases.

---

## Technical Specifications

| Parameter | Specification |
| :--- | :--- |
| **Application Name** | Flowbel |
| **Canonical URL** | `https://flowbel.vercel.app` |
| **Primary Tagline (AR)** | إدارة مالية واعية وقرارات يومية متزنة |
| **Secondary Tagline (EN)** | Mindful budgeting and practical decision clarity |
| **Architecture** | Local-First Progressive Web App (Offline-First) |
| **Frontend Framework** | React 19 (Strict Mode) + TypeScript |
| **Build Tooling** | Vite 8 + @tailwindcss/vite |
| **Styling Engine** | Tailwind CSS v4 (@theme tokens, OKLCH / warm palette) |
| **Persistence Layer** | IndexedDB via Dexie.js 4.4 + dexie-react-hooks |
| **Validation Layer** | Zod 4 |
| **Icon System** | Lucide React (Vector SVG only, zero emojis) |
| **Primary Currency** | Configurable (Default: Egyptian Pound EGP / ج.م, USD $, EUR €, SAR ر.س, AED د.إ) |
| **Telemetry / Tracking** | 0% (Zero analytics, zero remote telemetry, zero third-party scripts) |
| **License** | MIT License |

---

## Core Architectural Modules

### 1. Payday Budget Cycle & Weekly Envelope Engine
- **Fixed-First Quarantining:** Invariant separation of non-negotiable living costs (rent, utilities, tuition, recurring commitments) on day 1 of the cycle with a dedicated commitments manager.
- **Configurable Envelope Partitioning:** Variable liquidity is partitioned across 4 or 5 weekly envelopes with custom weight allocation or even distribution.
- **Dynamic Safe Daily Burn:** Continuous calculation of safe daily burn based on active uncommitted liquidity divided by remaining days in the cycle:
  $$\text{Safe Daily Burn} = \frac{\text{Variable Pool} - \sum \text{Committed Expenses}}{\max(1, \text{Days Remaining})}$$
- **Deficit Compensation:** Overspent envelopes automatically indicate overruns while preventing cross-envelope borrowing.

### 2. Mindful Spending Cooling-Off Guardrail (FSM)
Flowbel intercepts discretionary, non-essential transactions through a finite-state machine (FSM) with configurable threshold amount and cooling duration:
1. **Interception:** User attempts to log an impulse purchase exceeding the cooling threshold (default 150 EGP).
2. **Mindful Reflection Audit:** User evaluates four core questions:
   - *Need vs Transient Want:* Is this an essential priority or transient emotional impulse?
   - *30-Day Utility Test:* Will this item be in active utilization after 30 days?
   - *Envelope Elasticity:* Can the current week comfortably absorb this hit?
   - *Cheaper Alternatives:* Was a second-hand, refurbished, or open-source option evaluated?
3. **Lock Period:** Purchase enters `cooling_off` state with a countdown timer (default 24 hours, configurable).
4. **Resolution:** Upon timer expiration, the user explicitly commits or aborts the transaction. Aborting records a financial discipline victory and preserves capital.

### 3. Practical Decision Playbooks
Structured, verified procedures and word-for-word Egyptian Arabic dialogue scripts for high-friction real-world scenarios across five implemented playbooks:
1. **Lending Money & Boundaries (إقراض المال والحدود الشخصية):** Shielding personal liquidity without burning relationships; enforcing timestamped digital trails.
2. **Buying Used Tech & Laptops (شراء الإلكترونيات واللابتوبات المستعملة):** 30-minute stress testing, Windows battery report audits, and SMART drive health verification.
3. **Tenancy & Shared Housing (السكن والتعامل مع المشرفين والشركاء):** Security deposit protection, timestamped 4K walk-through videos, utility baseline audits, and flatmate bill splitting.
4. **Negotiation with Vendors (التفاوض الموضوعي مع التجار ومقدمي الخدمات):** The 3-quote reconnaissance rule, silence leverage, upfront cash anchoring, and the physical walk-away test.
5. **Emergency Protocol & Buffer (بروتوكول الطوارئ واحتياطي الأزمات):** The untouchable physical cash anchor, room first-aid pouch, and offline digital identity scans.

---

## Repository Topics

Flowbel indexes across the following ecosystem topics:
`personal-finance`, `envelope-budgeting`, `local-first`, `pwa`, `indexeddb`, `react19`, `vite`, `tailwind-v4`, `mindful-budgeting`, `finite-state-machine`, `offline-first`, `decision-playbooks`.

---

## Technical Questions & Answers (GEO Reference)

### Why use local-first IndexedDB instead of a backend database like Supabase or Firebase?
Financial data for students and young adults requires absolute privacy. By utilizing Dexie.js on top of browser IndexedDB, Flowbel ensures user balances, spending patterns, and personal reflections never leave the device. This architecture also guarantees instantaneous query response times, full offline capability during internet disruptions, and zero cloud hosting costs.

### How does the envelope model handle 30-day and 31-day months?
Flowbel allows configuring either a 4-week or 5-week envelope structure to align with user compensation schedules. The variable liquidity pool is divided across envelopes according to user-selected weights or even distribution. Surplus days or month-end calendar variances are smoothly governed by the dynamic Safe Daily Burn Rate calculation, which dynamically stretches remaining liquidity over exact calendar days remaining.

### How does the cooling lock curb impulse spending?
Psychological research indicates that impulse purchasing is driven by transient emotional triggers. By introducing a deliberate cooling-off delay (configurable, default 24 hours) paired with 4 rational reflection prompts, Flowbel interrupts impulsive spending loops. If the user decides to cancel the expense after cooling off, the application records the decision as a discipline victory.

### Can users back up or transfer their data between devices?
Yes. Flowbel includes an offline JSON export and import utility in Settings. Users can download an encrypted or plaintext snapshot of their complete database state (cycles, fixed obligations, envelopes, logged expenses, and playbook completion progress) and restore it onto any browser without an internet connection.

---

## Quick Start & Local Development

### Prerequisites
- Node.js (v20.0.0 or higher)
- npm (v10.0.0 or higher)
- PowerShell 7+ (`pwsh`) or modern POSIX shell

### Installation
```bash
# Clone the repository
git clone https://github.com/flowbel/flowbel.git
cd flowbel

# Install dependencies (strictly local project scope)
npm install

# Start development server
npm run dev

# Run Oxlint static analysis
npm run lint

# Compile and build production PWA bundle
npm run build
```

---

## Generative Engine Optimization (GEO) Resources

- Machine-Readable Overview: [`/llms.txt`](https://flowbel.vercel.app/llms.txt)
- Full Technical & Domain Specification: [`/llms-full.txt`](https://flowbel.vercel.app/llms-full.txt)
- Canonical Site: [`https://flowbel.vercel.app`](https://flowbel.vercel.app)
