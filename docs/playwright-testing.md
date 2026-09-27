# 🧪 Z-Sentinel AI — Playwright End-to-End Testing Guide
**Automated Quality Assurance & Verification**  
*IBM Z Datathon 2026*

---

## 1. Test Suite Architecture

Z-Sentinel AI includes an automated Playwright test suite covering all 14 functional and compliance specifications:

| Spec File | Test Target & Assertions |
|---|---|
| `01-landing.spec.js` | Landing page hero, telemetry ribbon, 10 sections, navigation. |
| `02-login.spec.js` | Login card, Google Sign-In button, separated options. |
| `03-demo-login.spec.js` | **Judge Demo Mode:** Entry, isolated session, watermark banner, guided tour, exit. |
| `04-dashboard.spec.js` | SOC layout, 7 metrics, Chart.js canvases, live stream table. |
| `05-transactions.spec.js` | Transaction monitor, simulator controls, amount formatting. |
| `06-threats.spec.js` | Threat detection center, 7 threat categories, severity tags. |
| `07-privacy.spec.js` | Privacy Guardian table, boundary redactions (`************3210`). |
| `08-alerts.spec.js` | Incident triage queue, priority badges, acknowledge action. |
| `09-copilot.spec.js` | AI Security Copilot chat interface, prompt pills, local engine response. |
| `10-ibmz.spec.js` | Mainframe telemetry adapter, simulated status banner, SMF feeds. |
| `11-responsive.spec.js` | Mobile drawer navigation, collapsible sidebar, touch responsiveness. |
| `12-api-health.spec.js` | REST `/api/health`, `/api/transactions`, `/api/analyze`, `/api/privacy`. |
| `13-legal-pages.spec.js` | All 10 legal pages load with correct titles, headings, and disclaimers. |
| `14-seo.spec.js` | Meta description, viewport, Open Graph, Twitter cards, JSON-LD, robots.txt, sitemap.xml. |

---

## 2. Installation & Running Tests

```bash
# 1. Install Node dependencies (Playwright)
npm install

# 2. Install Playwright browser binaries
npx playwright install --with-deps chromium

# 3. Run the full test suite
npx playwright test

# 4. Run tests with UI Test Runner
npx playwright test --ui

# 5. Run a specific test
npx playwright test tests/e2e/03-demo-login.spec.js
```

---

## 3. Automated Screenshot & Video Artifacts

Screenshots and videos generated during test runs are automatically output to:
* Desktop (1440 × 900) & Mobile (390 × 844): `artifacts/screenshots/`
* Demonstration Videos (1280 × 720, 16:9): `artifacts/videos/`
