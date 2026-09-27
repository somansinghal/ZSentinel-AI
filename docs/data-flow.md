# 🔄 Z-Sentinel AI — Data Flow Specifications
**End-to-End Execution Lifecycles**  
*IBM Z Datathon 2026*

---

## 1. Primary Data Flow: Transaction Telemetry to Mitigation Action

```
[IBM Z Stream] 
      │ 
      ▼
1. INGESTION & VALIDATION
      │  Payload parsed by IBM Z Adapter; validated against Pydantic Transaction schema.
      ▼
2. PRIVACY INTERCEPTION
      │  Privacy Guardian scans memo & fields; masks 16-digit PANs and SSNs at the boundary.
      ▼
3. FEATURE ENGINEERING
      │  Extracts velocity, amount ratio, device novelty, impossible travel velocity.
      ▼
4. ML ANOMALY DETECTION
      │  Scikit-Learn Isolation Forest pipeline computes continuous anomaly score (-1.0 to +1.0).
      ▼
5. COMPOSITE RISK SCORING
      │  Combines ML score with deterministic heuristic rule penalties (0–100 score).
      ▼
6. ACTION CLASSIFICATION
      │  Score >= 75: CRITICAL (Auto-Block)
      │  Score 50-74: HIGH (Step-Up MFA Challenge)
      │  Score 25-49: MEDIUM (Analyst Review)
      │  Score < 25:  LOW (Allow Settlement)
      ▼
7. DISPATCH & SOC TELEMETRY
      │  Incident card created in Threat Center; audit trail updated; metrics updated live.
      ▼
[Security Console / Analyst View]
```

---

## 2. Secondary Data Flow: AI Security Copilot Reasoning

```
[Analyst Prompt: "Why was transaction TX-83921 blocked?"]
      │
      ▼
1. INPUT PARSING & MINIMIZATION
      │  Prompt inspected for raw PII; sanitized before internal query dispatch.
      ▼
2. DATA RETRIEVAL
      │  Fetches transaction record TX-83921 from local store with calculated risk deductions.
      ▼
3. LOCAL DETERMINISTIC REASONING
      │  Evaluates rule violations: VelocityBurst (+25), UnknownDevice (+20), GeoJump (+25).
      │  Synthesizes deterministic response with human-readable rationale.
      ▼
4. OPTIONAL CLOUD AI ENHANCEMENT (GROQ FALLBACK)
      │  [Decision Check]
      │  ├── If Groq available & permitted:
      │  │     Sends sanitized context to Groq server-side endpoint.
      │  │     Formats conversational natural language response with "GROQ AI" badge.
      │  └── If Groq unavailable / offline / missing key:
      │        Emits verified local synthesis with "LOCAL SECURITY ENGINE" badge.
      ▼
5. RESPONSE RENDERING
      │  Analyst console receives structured response with execution time and deduction steps.
      ▼
[Security Operations Center Chat Interface]
```
