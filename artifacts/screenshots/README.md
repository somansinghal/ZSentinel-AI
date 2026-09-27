# Z-Sentinel AI — Screenshot Artifacts

This directory stores automated high-resolution screenshots generated for evaluation and documentation.

## Specifications
- **Desktop Viewport:** 1440 × 900 (High-DPI Retina @ 2x)
- **Mobile Viewport:** 390 × 844 (Mobile Drawer / Responsive)

## Targets
1. `landing-desktop.png` / `landing-mobile.png` — Main landing page & hero telemetry
2. `login-desktop.png` / `login-mobile.png` — Authenticated vs Judge Demo separation
3. `judge-demo-desktop.png` / `judge-demo-mobile.png` — Persistent amber banner & guided tour
4. `dashboard-desktop.png` / `dashboard-mobile.png` — SOC 7-metrics grid & live charts
5. `transactions-desktop.png` / `transactions-mobile.png` — Mainframe stream & simulation triggers
6. `threats-desktop.png` / `threats-mobile.png` — Threat intelligence classification & severity badges
7. `privacy-desktop.png` / `privacy-mobile.png` — Zero data leakage masked PAN/SSN/email tables
8. `alerts-desktop.png` / `alerts-mobile.png` — Incident triage queue & priority tags
9. `copilot-desktop.png` / `copilot-mobile.png` — AI conversational reasoning & zero raw PII policy
10. `ibmz-desktop.png` / `ibmz-mobile.png` — IBM Z simulated adapter telemetry & health status
11. `audit-desktop.png` / `audit-mobile.png` — Cryptographic hash audit log trail
12. `settings-desktop.png` / `settings-mobile.png` — SOC thresholds and model sensitivity settings
13. `privacy-policy-desktop.png` / `privacy-policy-mobile.png` — Privacy policy legal page
14. `terms-desktop.png` / `terms-mobile.png` — Terms of service legal page
15. `security-desktop.png` / `security-mobile.png` — Security architecture legal page

## How to Generate
```bash
npm run screenshots
```
Or pointing to a deployed production instance:
```bash
BASE_URL=https://z-sentinel-ai.vercel.app npm run screenshots
```
