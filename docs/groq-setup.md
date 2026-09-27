# ⚡ Z-Sentinel AI — Groq AI Setup Guide
**Optional Server-Side Natural Language Explanation Engine**  
*IBM Z Datathon 2026*

---

## 1. Overview & Resilience Guarantee

Z-Sentinel AI uses **Groq Cloud API (Free Tier)** as an *optional*, server-side natural language explanation provider for SOC analysts.

> **CRITICAL ARCHITECTURAL GUARANTEE:** The core security decision engine does NOT depend on Groq. If no Groq API key is provided, if network connectivity drops, or if rate limits are exceeded, Z-Sentinel AI continues to evaluate risk scores, detect anomalies, redact PII, and generate deterministic explanations locally without crashing or failing open.

---

## 2. Obtaining a Free Groq API Key

1. Visit the [Groq Console](https://console.groq.com/).
2. Create a free account or sign in with GitHub/Google.
3. In the left navigation, click **API Keys**.
4. Click **"Create API Key"**, give it a descriptive name (e.g. `z-sentinel-datathon`), and copy the key (`gsk_...`).

---

## 3. Server-Side Configuration

Configure your environment variables in `backend/.env` (or in Vercel Project Settings > Environment Variables):

```bash
# Optional Server-Side Groq API Key
GROQ_API_KEY=gsk_your_groq_api_key_here

# Configurable Model Name (Defaults to standard fast free-tier model)
GROQ_MODEL=llama-3.3-70b-versatile
```

### Security Verification
* **NEVER** expose `GROQ_API_KEY` in frontend HTML or JavaScript files.
* **NEVER** commit `.env` to GitHub. The `.gitignore` file explicitly excludes all `.env` files.
* In the frontend AI Copilot interface, observe the provenance badge:
  - Displays `GROQ AI` when Groq is actively responding.
  - Displays `LOCAL SECURITY ENGINE` when operating in resilient local mode.
