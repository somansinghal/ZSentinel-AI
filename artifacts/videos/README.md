# Z-Sentinel AI — Demo Video Artifacts

This directory stores automated demo video recordings showcasing the end-to-end Judge Demo journey.

## Video Specifications
- **Resolution:** 1280 × 720 (720p HD)
- **Aspect Ratio:** 16:9
- **Format:** WebM / MP4 (Playwright video capture)
- **Zero Sensitive Data:** All transactions, user identifiers, and IBM Z events recorded in this video are 100% synthetic. No passwords, credentials, API keys, `.env` files, or production terminals are ever exposed.

## Journey Sequence Recorded
1. **0:00 — Landing Page:** Value proposition, hero architecture, telemetry ribbon.
2. **0:25 — Authentication Portal:** Clean separation between Google SSO and Judge Demo.
3. **0:45 — Enter Judge Demo:** One-click zero-credential entry with persistent amber banner.
4. **1:10 — SOC Dashboard:** 7 core metrics, live Chart.js trend, latency indicators.
5. **1:40 — One-Click Scenarios:** Interactive trigger of "Suspicious TX" and "Transaction Burst".
6. **2:10 — Threat Detection Center:** 4 flagged incidents, severity matrix, mitigation advice.
7. **2:40 — Privacy Guardian:** Live demonstration of PAN, SSN, and email masking with zero raw PII leaks.
8. **3:10 — AI Security Copilot:** Incident explanation dialog and query interface.
9. **3:40 — IBM Z Mainframe Telemetry:** Simulated channel adapter status, SMF/CICS ingestion.
10. **4:10 — System Audit Trail:** Immutable tamper-evident security audit logs.
11. **4:30 — Exit Demo Mode:** Clean session teardown returning to login.

## How to Record
```bash
npm run record:video
```
Or pointing to a deployed production instance:
```bash
BASE_URL=https://z-sentinel-ai.vercel.app npm run record:video
```
