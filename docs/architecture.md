# 🏗️ Z-Sentinel AI — System Architecture
**AI Security & Privacy Guardian for IBM Z**  
*IBM Z Datathon 2026*

---

## 1. High-Level Architecture Overview

Z-Sentinel AI employs a decoupled, layered cyber-defense architecture specifically tailored for high-throughput mainframe transaction workflows. The system separates the presentation layer (Vanilla HTML5/CSS3/ES6), identity layer (Firebase Authentication), deterministic security enforcement, unsupervised machine learning, on-premise privacy masking, and an optional natural language AI copilot layer.

```
+-----------------------------------------------------------------------------------+
|                            PRESENTATION & SOC LAYER                               |
|                                                                                   |
|   +-----------------------+     +-----------------------+     +---------------+   |
|   | Landing Page (Public) |     |  Login / Judge Demo   |     |  SOC Console  |   |
|   | [REAL]                |     |  [REAL / ISOLATED]    |     |  [REAL]       |   |
|   +-----------------------+     +-----------------------+     +---------------+   |
|                                             |                                     |
|                                             v                                     |
|                              +-----------------------------+                      |
|                              |   Liquid Glass Navigation   |                      |
|                              |   [REAL]                    |                      |
|                              +-----------------------------+                      |
+---------------------------------------------+-------------------------------------+
                                              | HTTPS / REST
                                              v
+-----------------------------------------------------------------------------------+
|                              BACKEND SERVICE LAYER                                |
|                              (FastAPI / Python 3.10+)                             |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   | 1. Ingestion Adapter Layer                                                |   |
|   |    Decouples raw transport protocols (CICS, SMF Type 80) into schema.     |   |
|   |    [SIMULATED IN DEMO / ADAPTER INTERFACE REAL]                           |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |                                         |
|                                         v                                         |
|   +---------------------------------------------------------------------------+   |
|   | 2. Privacy Guardian Engine                                                |   |
|   |    Deterministic boundary sanitization of PAN, SSN, email, phone.         |   |
|   |    [REAL - LOCAL PROCESSING]                                              |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |                                         |
|                                         v                                         |
|   +---------------------------------------------------------------------------+   |
|   | 3. Deterministic Heuristic Security Engine                                |   |
|   |    Evaluates policy violations (Velocity, Geo-Entropy, Unknown Devices).  |   |
|   |    [REAL - 100% DETERMINISTIC]                                            |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |                                         |
|                                         v                                         |
|   +---------------------------------------------------------------------------+   |
|   | 4. ML Anomaly Detection (Isolation Forest)                                |   |
|   |    Calculates multi-dimensional continuous anomaly deviation.             |   |
|   |    [REAL - SCIKIT-LEARN PIPELINE]                                         |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |                                         |
|                                         v                                         |
|   +---------------------------------------------------------------------------+   |
|   | 5. Composite Risk Engine                                                  |   |
|   |    Outputs explainable Risk Score (0–100) & Action (ALLOW/CHALLENGE/BLOCK)|   |
|   |    [REAL]                                                                 |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |                                         |
|                                         v                                         |
|   +---------------------------------------------------------------------------+   |
|   | 6. Explanation Engine & AI Copilot                                        |   |
|   |    - Local Rule Synthesizer [REAL - PRIMARY]                              |   |
|   |    - Groq Cloud LLM [OPTIONAL - SERVER-SIDE FALLBACK]                     |   |
|   +---------------------------------------------------------------------------+   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Classification Matrix

To adhere strictly to truth-in-advertising and hackathon transparency rules, every component is explicitly classified:

| Component | Status | Details |
|---|---|---|
| **Frontend UI (HTML/CSS/JS)** | **REAL** | Native HTML5, CSS3 variables, ES6 Vanilla JS, Chart.js, Lucide Icons. |
| **Liquid Glass Design System** | **REAL** | Translucent backdrop blur applied strictly to Topbar, Sidebar, and Footer. |
| **Google Authentication** | **REAL** | Firebase Authentication Web SDK popup handshake. |
| **Judge Demo Mode** | **REAL / ISOLATED** | Dedicated zero-credential demo session operating on synthetic datasets. |
| **FastAPI Backend** | **REAL** | Asynchronous Python REST API with Pydantic validation. |
| **Privacy Guardian** | **REAL** | Local regex redaction masking PAN, SSN, phone, and emails before logging. |
| **Risk Scoring Engine** | **REAL** | Heuristic policy deductions producing 0–100 risk score with human reasons. |
| **Isolation Forest ML** | **REAL** | Scikit-learn anomaly detection model trained on multi-vector features. |
| **Groq AI Service** | **OPTIONAL** | Server-side natural language summarizer. System operates 100% locally if absent. |
| **IBM Z Mainframe Feed** | **SIMULATED** | Clean adapter streaming realistic synthetic CICS & SMF Type 80 transactions. |

---

## 3. Resilience & Failure Isolation

1. **No External Single Point of Failure:** If the internet connection drops or the Groq API key is omitted, the local security engine computes all risk scores and deterministic reasons locally.
2. **Zero Client Secrets:** Private backend tokens and Groq API keys reside strictly on the server and are never accessible to client browsers.
3. **Demo Isolation:** Judge Demo Mode modifies only in-memory browser states and does not mutate real database records or user documents.
