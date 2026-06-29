# VeriCode  🚀

VeriCode is a next-generation static code analysis and evaluation suite designed to identify logic flaws, evaluate standard security vulnerabilities, detect runtime bottlenecks, and provide elegant refactored blueprints in real-time. 

Integrating the full-stack performance of a **Node.js Express backend** with a beautiful, responsive **React 18 frontend** and **Monaco Editor components**, VeriCode is powered by the latest **Google Gemini models** utilizing an automated high-reliability dual-model failover mechanism.

---

## 🎨 Visual Preview & Design

VeriCode features a theme meticulously styled around a sophisticated **Cyber Emerald Dark Palette (`#050807`)**. It transitions fluidly from a beautiful, feature-rich landing page into an immersive developer workspace containing responsive visual items:
*   **Monaco Code Container**: Full-fidelity code editing matching industry-standard IDE behavior with automatic language tokenization, syntax highlights, and line markers.
*   **CodeScore Radar Gauge**: An elegant real-time circular SVG animation mapping the generated `overallScore` (out of 100).
*   **Segmented Insight Monitors**: Distinct indicators classifying defects, security risks, and optimization paths.
*   **Dual-Window Monaco Interface**: An input workspace paired side-by-side with a read-only code review box presenting a complete, commented refactored blueprint.

---

## 📋 Core System Requirements

To build, test, and host VeriCode locally or in containerized cloud environments, ensure the following specifications are present:

### ⚙️ Minimum Software Versions
*   **Node.js**: `v18.x` or higher (Long-Term Support recommended)
*   **npm**: `v9.x` or higher
*   **Modern Web Browser**: Google Chrome, Mozilla Firefox, Safari, or Microsoft Edge (requires full iframe canvas permission compatibility for Monaco container renders)

### 🔑 API Handshakes
*   **Google Gemini API Key**: An active token is required to allow the Express backend to coordinate static analysis. You can obtain yours directly from the [Google AI Studio Console](https://aistudio.google.com/).

---

## 🏗️ Project Architecture & Tech Stack

The workspace operates as an integrated full-stack single-container application:

```
├── .env.example            # Environment design template
├── .gitignore              # Dependency & static files exclude rule set
├── index.html              # Frontend single-page app root container
├── metadata.json           # Application manifest configurations
├── package.json            # Script definitions and dependency manifests
├── server.js               # Multi-environment Express gateway server
├── vite.config.js          # Client bundle builder configuration
├─┬ backend/
│ ├── server.js             # API Router, input validation, and endpoints
│ └─┬ services/
│   └── gemini.js           # Gemini API Client wrapper & fallback pipelines
├─┬ frontend/
│ ├── App.jsx               # Navigation route dispatcher
│ └─┬ components/
│   ├── LandingPage.jsx     # High-fidelity marketing landing container
│   ├── Workspace.jsx       # Monaco Editor & interactive control dashboard
│   └── ResultsPanel.jsx    # SVG gauges, audit sections, & refactored output
└─┬ src/
  ├── index.css             # Tailwind CSS & custom google font importing
  └── main.jsx              # React 18 bootstrap injector
```

### 🛰️ Core Dependencies (Backend & Bundlers)
*   `@google/genai (^2.4.0)`: Google's official, modern GenAI TypeScript SDK.
*   `express (^4.21.2)`: Lightweight container middleware serving both assets and routing.
*   `dotenv (^17.2.3)`: Environmental configuration file parser.
*   `vite (^6.2.3)` & `@tailwindcss/vite (^4.1.14)`: Lightning-fast reactive frontend bundling and compilation workflows.

### 🖼️ Core Dependencies (Frontend Client)
*   `react (^19.0.1)`: Component structure layout and lifecycles.
*   `@monaco-editor/react (^4.7.0)`: Live VS-Code engine simulation container.
*   `lucide-react (^0.546.0)`: Unified and modern stroke-based visual SVG iconography.
*   `motion (^12.23.24)`: Smooth entrance transitions and view route cross-faddings.

---

## 🛡️ Dual-Model Resilient AI Engine

To circumvent traditional rate-limit constraints or periodic region maintenance outages, the backend features an intelligent fallback chain:
1.  **Primary Model (`gemini-2.5-flash`)**: Invoked first to process complex structures, perform OWASP security threat audits, and outline the complete code rewrite.
2.  **Fallback Model (`gemini-3.1-flash-lite`)**: Instantly gets triggered silently if the primary model throws a 503 Service Unavailable or 429 Quota Exceeded error. This maintains service uptime and keeps user experience lightning-fast.

---

## 💡 Supported Languages & 1-Click Templates

Workspace includes a 1-click dropdown loader to pre-populate buggy/unoptimized code template sequences across five languages:
*   **JavaScript**: Focuses on memory leakage from global states, loose equality (`==`), and high-complexity $O(N^2)$ loops.
*   **Python**: Flags SQL Injection risks, unsafe file write bottlenecks inside loops, and risky database index lookups.
*   **Java**: Highlights hardcoded administrator credentials, system output diagnostic leakages, and explosive recursive stack overflows.
*   **C++**: Spotlights unsafe memory allocations, buffer overrun cycles, and missing `delete[]` leaks.
*   **C (ANSI)**: Captures fatal legacy buffer overwrites using the risky `gets()` function.

---

## 🚀 Step-by-Step Installation & Setup

Follow these commands to deploy the app workspace locally:

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd VeriCode
```

### 2. Configure Environment Secrets
Create a `.env` file at the root of the project directory based on our example:
```bash
cp .env.example .env
```
Open `.env` and configure your credentials:
```env
# Server Port Configuration
PORT=3000

# Server Node Environment (change to "production" when bundling)
NODE_ENV=development

# Google GenAI Secret Endpoint Access API Token
GEMINI_API_KEY=AIzaSy...Your_Gemini_Key_Here...
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Workspace
Start the joint Express & Vite development servers concurrently:
```bash
npm run dev
```
Once booted, visit the interactive preview at **`http://localhost:3000`** in any modern web browser.

### 5. Build for Production Deployments
Prepare static assets and package bundled files inside the `/dist` directory:
```bash
npm run build
npm start
```

---

## 🧬 API Documentation

### **`POST /api/review`**
Submits raw client code to the backend router.

*   **Request Headers**:
    ```json
    { "Content-Type": "application/json" }
    ```
*   **Request Payload**:
    ```json
    {
      "language": "javascript",
      "code": "function check() { if (x == 10) { console.log(x); } }"
    }
    ```
*   **Response Format (JSON Schema compliant)**:
    ```json
    {
      "overallScore": 85,
      "codeQuality": "Detailed analysis text...",
      "bugs": ["Discovered buggy scope...", "Variable leak..."],
      "performance": ["Nesting operations..."],
      "security": ["Vulnerability audit..."],
      "bestPractices": ["Styling advice..."],
      "refactoredCode": "// Complete corrected program..."
    }
    ```

---

