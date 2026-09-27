# 🛡️ Z-Sentinel AI — Security Architecture
**Defense-in-Depth Specification**  
*IBM Z Datathon 2026*

---

## 1. Security Architecture Principles

Z-Sentinel AI is engineered around the principle of **Zero-Trust Mainframe Defense**:
1. **Never Trust, Always Verify:** All inputs—whether from public interfaces, simulated streams, or APIs—are validated through strict Pydantic schemas.
2. **Fail-Safe Defaults:** If external AI or network dependencies fail, the system falls back to secure, deterministic local processing rather than failing open.
3. **Least Privilege & Complete Isolation:** The Judge Demo environment is completely isolated from real user data and backend secrets.

---

## 2. Security Safeguards

```
+---------------------------------------------------------------------------------+
|                                SECURITY DOMAINS                                 |
|                                                                                 |
|  [Identity Domain]          [API & Network Domain]      [AI & Data Domain]      |
|  - Firebase Auth            - FastAPI CORS Controls     - Local Rule Engine     |
|  - Google SSO Handshake     - Pydantic Validations      - Scikit-Learn Model    |
|  - Isolated Judge Demo      - Vercel Edge Serverless    - Boundary PII Masking  |
|  - Auth-Guard Middleware    - Server-Side Secrets Only  - Server-Side Groq      |
+---------------------------------------------------------------------------------+
```

### A. Authentication & Session Management
* **Real Authentication:** Implemented via Google Firebase Web SDK (v10). Handles token validation, passwordless Google Single Sign-On, and session expiration.
* **Client-Side Auth Guard:** `auth-guard.js` intercepts all attempts to access internal console pages (`dashboard.html`, `pages/*.html`). Unauthenticated requests are immediately bounced to `login.html`.
* **Judge Demo Isolation:** Activated via a dedicated toggle (`zsentinel_judge_demo_mode`). Operates inside a strictly sandboxed, read-only session with synthetic data (`DEMO-USER-001`, `TX-DEMO-001`). It does not read or write real Firestore collections.

### B. Secrets Management
* **No Client-Side Secrets:** Private keys, including `GROQ_API_KEY`, are strictly stored in server-side environment variables (`.env`). They are never bundled into client JavaScript or rendered in HTML attributes.
* **Public Configurations:** Firebase Web parameters (`apiKey`, `projectId`) are public identifiers designed for client-side authentication handshakes, protected by Firebase domain authorization rules.

### C. Input Validation & API Security
* All FastAPI routes strictly enforce Pydantic type models. Malformed numbers, invalid strings, or unexpected keys are rejected with HTTP 422 errors.
* CORS headers are restricted to authorized frontend origins in production.

### D. Zero-Leakage Privacy Protection
* The local **Privacy Guardian** intercepts payloads before logging or AI inference.
* Primary Account Numbers (16-digit PANs) and Social Security Numbers (9-digit SSNs) are masked to the last 4 digits (e.g., `************3210`).
* No unredacted customer PII is sent to external LLMs.

### E. Tamper-Evident Audit Trails
* Security interventions (including automated transaction blocks, risk recalculations, and analyst queries) are logged in an immutable audit ledger with UTC timestamps and provenance tags.
