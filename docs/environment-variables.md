# 🔑 Z-Sentinel AI — Environment Variables
**Configuration Reference**  
*IBM Z Datathon 2026*

---

## 1. Classification Overview

To maintain security compliance, configuration values are divided into **Public** (client-side web parameters) and **Private** (server-side secrets):

| Variable | Scope | Classification | Description | Default / Example |
|---|---|---|---|---|
| `GROQ_API_KEY` | Backend | **PRIVATE (SECRET)** | Server-side key for optional Groq AI explanations. Never expose to client. | `gsk_...` |
| `GROQ_MODEL` | Backend | **PRIVATE (CONFIG)** | Groq LLM model name. | `llama-3.3-70b-versatile` |
| `IBMZ_STREAM_MODE` | Backend | **PRIVATE (CONFIG)** | Mainframe adapter ingestion mode (`simulated` or `live`). | `simulated` |
| `IBMZ_HOST` | Backend | **PRIVATE (CONFIG)** | Mainframe host target IP or hostname. | `127.0.0.1` |
| `IBMZ_PORT` | Backend | **PRIVATE (CONFIG)** | Mainframe telemetry socket port. | `5050` |
| `PORT` | Backend | **PRIVATE (CONFIG)** | Local FastAPI HTTP port. | `8000` |
| `HOST` | Backend | **PRIVATE (CONFIG)** | Local network bind host. | `0.0.0.0` |
| `apiKey` | Frontend | **PUBLIC** | Firebase Web API key for Google OAuth handshake. | Public client string |
| `authDomain` | Frontend | **PUBLIC** | Firebase project authentication domain. | `project.firebaseapp.com` |
| `projectId` | Frontend | **PUBLIC** | Firebase unique project identifier. | `z-sentinel-ai` |

---

## 2. Safety Guidelines

1. **Never Commit Secrets:** `.env` files are explicitly excluded in `.gitignore`.
2. **Graceful Defaults:** All private variables possess safe fallback defaults (e.g., if `GROQ_API_KEY` is omitted, the backend automatically operates in 100% offline local engine mode).
3. **No Hardcoded Keys:** Client-side JavaScript (`public/js/`) contains zero server secrets or private tokens.
