# 🔧 Z-Sentinel AI — Troubleshooting Guide
**Common Issues & Resolutions**  
*IBM Z Datathon 2026*

---

## 1. Authentication Issues

### "auth/unauthorized-domain" Error
* **Cause:** The host domain (e.g. `localhost` or your Vercel deployment URL) is not listed in your Firebase project's authorized domains.
* **Fix:** Open [Firebase Console](https://console.firebase.google.com/) > **Authentication** > **Settings** > **Authorized domains**, click **Add domain**, enter your domain, and save.
* **Alternative:** Click **"Enter Judge Demo"** on `login.html` to bypass Firebase authentication for evaluation.

### "auth/popup-closed-by-user" Error
* **Cause:** The Google OAuth popup window was closed prior to completing authentication.
* **Fix:** Re-click "Continue with Google" and complete the Google login prompt.

---

## 2. API & Network Issues

### CORS Error when accessing `/api/*`
* **Cause:** The frontend is served on a port or domain not allowed by FastAPI CORS middleware.
* **Fix:** `backend/main.py` is configured with `allow_origins=["*"]` for local evaluation. In production, ensure the Vercel domain matches the origin.

### Groq API Rate Limit or Timeout
* **Cause:** Free tier Groq rate limits reached or network latency.
* **Fix:** Z-Sentinel AI automatically falls back to the **Local Security Engine**. The UI will display `AI Provider: Local Security Engine` with no disruption to risk calculations.

---

## 3. Storage & Session Issues

### Session appears stuck in Demo Mode
* **Fix:** In the yellow Judge Demo banner, click **"Exit Demo Mode"**, or click **"Logout"** in the topbar. You can also run `localStorage.clear()` in the browser console.
