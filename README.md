# Venture Vision: smart start creates smart startups

**Venture Vision** is a full-stack spatial card-deck startup strategy diagnostic and synthesis web application powered by a **Qwen3 4B** (`Qwen/Qwen3-4B` / `qwen3:4b`) compatible backend engine. It guides founders, operators, and syndicate partners through a **36-question, 5-perspective strategic diagnostic deck** and synthesizes an actionable **5-phase executive execution roadmap**.

---

## ✨ Key Features

### 1. Spatial 3D Card-Deck Interface & Motion Background
- **01 · Authorization & User Registration Deck**:
  - Interactive 3D perspective card stage with cursor-responsive tilt (`±3.5° X`, `±4.5° Y`) and layered glass sub-decks.
  - Supports **Workspace Sign In**, **New User Registration** (Full Name, Startup/Venture Name, Founder Role, Startup Stage, Executive Email, and Password confirmation), and **Instant Guest Mode**.
- **02 · Interactive 36-Question Diagnostic Deck**:
  - Evaluates startup readiness across **5 core perspectives**:
    1. **STAGE 01 · CUSTOMER** (8 Questions) — ICP urgency, pain severity, willingness-to-pay, and sales motion.
    2. **STAGE 02 · OWNER** (6 Questions) — Founder vision, capital horizon, governance, and velocity targets.
    3. **STAGE 03 · MARKET** (7 Questions) — TAM/SAM/SOM sizing, category wedge, and distribution moat.
    4. **STAGE 04 · INVESTOR** (7 Questions) — Defensibility graph, fundraising ask, and milestone valuation triggers.
    5. **STAGE 05 · FINANCE** (8 Questions) — Revenue model, gross margin targets, burn rate, and unit economics.
  - Real-time debounced autosave (`POST /api/session/autosave`), keyboard navigation (`Enter`, `←`, `→`), and optional context notes per card.
- **03 · Executive Dossier Review**:
  - Consolidates all 36 structured inputs into a 5-stage executive matrix with signal fidelity tracking and one-click jump-to-edit per stage.
- **04 · Qwen3 4B Realtime Synthesis Output**:
  - Generates a 5-phase execution roadmap (**Phase 01: Problem Validation** through **Phase 05: Scale & Funding**) with actionable workstreams, critical milestones, and Qwen3 risk flags.
  - Includes **Startup Readiness gauges** (`Cust`, `Mkt`, `Fin`, and weighted overall readiness), **Synthesis Metric**, **Runway Projection**, and **Strategic Moat** grading.
  - Interactive **Weight Parameters Modal** to tune perspective weights (`5%–50%`) and toggle Qwen3's hybrid thinking token (`/think` vs `/no_think`).
  - Inspectable **`<think>...</think>` Chain-of-Thought Drawer** and **JSON Dossier Export**.
- **Ambient Diffused Stars Motion Background & Light/Dark Themes**:
  - 60fps HTML5 Canvas starfield with multi-depth parallax, soft bokeh halos, celestial cross-flares, and breathing nebula clouds.
  - Default **Light Theme** (`#f5faf8` porcelain surface) with a one-click header toggle to **Dark Theme** (`#070d14` obsidian deep-space surface).

---

## 🧠 Qwen3 4B Backend Architecture

The Express + TypeScript backend (`server.ts`) is designed specifically for **Qwen3 4B** (`Qwen/Qwen3-4B` via Ollama, vLLM, or SGLang) with a 3-tier execution pipeline:

1. **Deterministic 36-Vector Scoring Engine**:
   - Computes baseline readiness scores (`Cust`, `Mkt`, `Fin`), moat tier, and weighted consensus metrics directly from the 36 answer vectors so numerical KPIs never hallucinate.
2. **Qwen3 4B ChatML Prompt & Hybrid Thinking Protocol**:
   - Compiles the 36 diagnostic answers and custom perspective weights into a ChatML prompt (`<|im_start|>system ... <|im_end|>`).
   - Supports Qwen3's native `/think` and `/no_think` directives and parses `<think>...</think>` reasoning blocks separately from the structured JSON payload.
3. **Resilient Multi-Tier Synthesis Fallback**:
   - **Tier 1**: Direct OpenAI-compatible REST call to your configured Qwen3 4B server (`QWEN3_API_BASE`, default `http://localhost:11434/v1` with model `qwen3:4b`).
   - **Tier 2**: Server-side cloud bridge fallback if a local Ollama/vLLM instance is unreachable.
   - **Tier 3**: Deterministic 36-vector synthesis calibrated to the user's exact card selections.

---

## 🔐 User Registration & Credential Security

User registration and authentication are handled in `server.ts`:
- **Password Hashing**: Uses Node's native `crypto.scryptSync` with a unique 16-byte random salt per user.
- **Timing-Safe Verification**: Uses `crypto.timingSafeEqual` during login (`POST /api/auth/login`) to prevent timing attacks.
- **Persistence**: Stores registered user records in `data/users.json` with automatic in-memory fallback.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registers a new user (Full Name, Venture Name, Role, Stage, Email, Password) with salted `scrypt` hashing. |
| `POST` | `/api/auth/login` | Authenticates user credentials and initializes the active workspace session. |
| `POST` | `/api/auth/logout` | Logs out the current workspace session. |
| `GET` | `/api/auth/users` | Lists sanitized metadata for registered platform users. |
| `GET` | `/api/health` | Returns server health, active Qwen3 4B model ID, and `/think` status. |
| `GET` | `/api/session` | Retrieves active workspace state, 36 card answers, weights, and latest synthesis artifact. |
| `POST` | `/api/session/autosave` | Autosaves card selections, context notes, weight parameters, and Qwen3 endpoint configuration. |
| `POST` | `/api/qwen3/synthesize` | Runs the 36-vector scoring engine and Qwen3 4B synthesis pipeline. |
| `GET` | `/api/architecture-blueprint` | Returns Qwen3 4B hardware specs, recommended launch commands, and live ChatML preview. |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and adjust as needed:
```bash
cp .env.example .env
```

Optional Qwen3 4B local server variables:
```env
QWEN3_API_BASE="http://localhost:11434/v1"
QWEN3_MODEL_NAME="qwen3:4b"
QWEN3_API_KEY="EMPTY"
```

### 3. Run Local Qwen3 4B Server (Optional)
Using **Ollama**:
```bash
ollama run qwen3:4b
```
Or using **vLLM**:
```bash
vllm serve Qwen/Qwen3-4B --enable-reasoning --reasoning-parser deepseek_r1 --max-model-len 32768 --port 8000
```

### 4. Start the Full-Stack Application
```bash
npm run dev
```
The Express + Vite server will start on `http://localhost:3000`.

---

## 📁 Project Structure

```text
├── server.ts                                  # Express backend, Auth (scrypt), 36-vector scorer & Qwen3 4B pipeline
├── index.html                                 # HTML entry point & metadata
├── src/
│   ├── App.tsx                                # Main application state, screen router & theme controller
│   ├── index.css                              # Global typography (Comic Sans), glassmorphism & Dark Theme rules
│   ├── data/
│   │   └── deckData.ts                        # 36 diagnostic questions across 5 perspectives & synthesis schemas
│   └── components/
│       ├── AmbientStarfieldBackground.tsx     # 60fps canvas diffused stars & nebula motion background
│       ├── AuthDeckScreen.tsx                 # Screen 01: 3D Login & New User Registration card deck
│       ├── QuestionDeckScreen.tsx             # Screen 02: Interactive 36-card diagnostic deck
│       ├── DossierReviewScreen.tsx            # Screen 03: 5-stage Executive Dossier Review matrix
│       ├── SynthesisOutputScreen.tsx          # Screen 04: Qwen3 4B 5-phase synthesis roadmap & weight tuner
│       ├── TopNavHeader.tsx                   # Persistent header with Light/Dark theme toggle & Logout button
│       ├── BackendArchModal.tsx               # Live Qwen3 4B endpoint configurator & ChatML inspector
│       └── BrandIcons.tsx                     # Venture Vision emblems & founder avatar components
└── README.md
```
