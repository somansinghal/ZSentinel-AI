# 🧑‍⚖️ Z-Sentinel AI — Judge Quick Start Guide
**IBM Z Datathon 2026 Evaluation Roadmap**  
*Time to evaluate: 3 to 5 minutes*

---

## 🚀 START HERE (10 Seconds)

1. Open the deployed application URL or local site: `http://localhost:3000` (or `http://localhost:8000`).
2. Click **"Security Console"** on the landing page to visit the Login page.
3. On the Login page, locate the **JUDGE DEMO** section and click **"Enter Judge Demo"**.
4. **No login credentials, Google accounts, or personal data are required.** You will immediately enter the protected Security Operations Center (SOC) inside an isolated demonstration sandbox.

---

## ⏱️ Recommended 3-Minute Journey (Quick Evaluation)

* **Minute 1: SOC Dashboard & Real-Time Metrics**
  - Observe the **Liquid Glass Topbar, Sidebar, and Footer** contrasted against solid, readable data cards.
  - Notice the persistent yellow **JUDGE DEMO MODE** banner confirming all data is synthetic.
  - Review the **7 Key SOC Metrics** (Total TX, Analyzed, Threats, Critical, Blocked, PII Redactions, Posture Score).
  - Observe the interactive **Chart.js** telemetry graphs.

* **Minute 2: Deterministic Scenario Simulation**
  - In the **One-Click Demo Scenarios** bar at the top of the dashboard, click **"Suspicious TX"** or **"Transaction Burst"**.
  - A real-time toast notification appears, and an instant flagged event is prepended to the live stream table.
  - Click **"Threat Detection"** in the left sidebar to inspect the categorized threat record (`THR-1082` with human-readable deduction points).

* **Minute 3: Privacy Guardian & Zero Data Leakage**
  - In the left sidebar, click **"Privacy Guardian"**.
  - Review the PII Redaction table demonstrating how 16-digit credit card PANs (`4929 1102 9481 3210`) are automasked to `************3210` before storage.
  - In the banner, click **"Exit Demo Mode"** to verify clean session termination.

---

## ⏱️ Recommended 5-Minute Journey (Deep Dive)

Follow the 3-minute journey above, plus:

* **Minute 4: AI Security Copilot Reasoning**
  - Click **"AI Copilot"** in the sidebar.
  - Click one of the pre-composed prompt pills: *"Why was transaction TX-83921 blocked?"*
  - Observe how the response combines heuristic deductions (velocity spike, unknown device DEV-99, impossible geographic jump) with an Isolation Forest score (-0.84).
  - Notice the **"LOCAL SECURITY ENGINE"** badge confirming resilient execution with zero cloud LLM single points of failure.

* **Minute 5: IBM Z Integration & Guided Walkthrough**
  - Click **"IBM Z Integration"** in the sidebar.
  - Review the CICS, SMF Type 80, and z/OSMF adapter telemetry channels clearly labeled as simulated for the datathon.
  - Click the **"Guided Tour"** button in the yellow Judge Demo banner to step through the built-in 8-step interactive walkthrough.

---

## 🔍 Core Technological Capabilities Demonstrated

| Area | Capability Demonstrated |
|---|---|
| **IBM Z Architecture** | Pluggable adapter layer streaming synthetic CICS & SMF Type 80 mainframe telemetry. |
| **Machine Learning** | Scikit-learn Isolation Forest pipeline computing continuous anomaly scores across 9 transaction vectors. |
| **Deterministic Rules** | Explainable penalty points (+25 burst, +20 unknown device, +20 impossible travel) combined into a 0–100 risk score. |
| **Privacy Guardian** | Zero-leakage regex engine redacting PAN, SSN, email, and phone numbers at the ingestion boundary. |
| **AI Resilience** | Deterministic local reasoning engine; optional Groq AI fallback with zero raw PII transmitted. |
| **Design Integrity** | Liquid Glass system used exclusively on navigation frames; high-contrast solid cards for analytical clarity. |
