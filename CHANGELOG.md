# Changelog — Z-Sentinel AI

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-27

### Added
- **Initial IBM Z Datathon 2026 Release**:
  - Enterprise landing page featuring 10 architectural sections and live telemetry ribbon.
  - Liquid Glass Design System applied exclusively to Topbar, Sidebar, and Footer.
  - Dedicated **Judge Demo Mode** offering isolated, credential-free evaluation with deterministic synthetic data.
  - Built-in 8-step **Guided Tour** and one-click demo scenario engine (Normal, Suspicious, Burst, Unknown Device, Unusual Location, Account Takeover, PII Exposure, IBM Z Event).
  - Real Google Authentication via Firebase Web SDK v10 with client-side Auth Guard.
  - Security Operations Center (SOC) dashboard featuring 7 key telemetry metrics and Chart.js visualizations.
  - Threat Detection Center classifying 7 enterprise threat vectors with explainable deduction reasons.
  - Privacy Guardian Engine delivering automated boundary masking of PANs, SSNs, emails, and phone numbers.
  - Resilient AI Security Copilot with deterministic local reasoning and optional server-side Groq fallback.
  - IBM Z integration adapter layer supporting simulated CICS and SMF Type 80 transaction streams.
  - Complete 10-page legal package (Privacy Policy, Terms, Cookies, Acceptable Use, Security, AI Disclaimer, Data Processing, Third-Party Services, Accessibility, Contact).
  - Vercel production deployment setup with serverless Python entrypoint (`api/index.py`).
  - Automated Playwright end-to-end test suite (14 specifications) and SEO optimization package.
