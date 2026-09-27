# 🚀 Z-Sentinel AI — Vercel Production Deployment Guide
**Zero-Cost Free-First Cloud Hosting**  
*IBM Z Datathon 2026*

---

## 1. Prerequisites
* A free [Vercel Account](https://vercel.com).
* A GitHub account with the Z-Sentinel AI repository pushed.
* Optional: Free Groq API Key and Firebase Project Config.

---

## 2. Step-by-Step Deployment

### Step 1: Import Project into Vercel
1. Log in to [Vercel](https://vercel.com/dashboard).
2. Click **"Add New..."** > **"Project"**.
3. Select your `Z-Sentinel-AI` GitHub repository and click **Import**.

### Step 2: Configure Project Settings
* **Framework Preset:** Select **Other**.
* **Root Directory:** Leave as `./` (repository root).
* **Build Command:** Leave empty (static frontend requires zero build steps).
* **Output Directory:** Leave empty (managed automatically via `vercel.json`).

### Step 3: Add Environment Variables
Under the **Environment Variables** section in Vercel, add:
* `GROQ_API_KEY`: *(Optional)* Your server-side Groq API key (`gsk_...`).
* `GROQ_MODEL`: `llama-3.3-70b-versatile` (or your preferred Groq model).
* `IBMZ_STREAM_MODE`: `simulated`

### Step 4: Click Deploy
1. Click **Deploy**.
2. Vercel automatically:
   - Builds the Python serverless function at `api/index.py` using `@vercel/python`.
   - Mounts static files from `public/` to the domain root `/`.
   - Routes all `/api/*` requests to the FastAPI backend.

### Step 5: Authorize Your Vercel Domain in Firebase
1. Once deployed, copy your assigned Vercel domain (e.g. `z-sentinel-ai.vercel.app`).
2. Open the [Firebase Console](https://console.firebase.google.com/) > **Authentication** > **Settings** > **Authorized domains**.
3. Click **Add domain**, enter your Vercel domain, and click **Save**.

---

## 3. Post-Deployment Verification Checklist

1. **Verify Backend Health:**
   Visit: `https://your-domain.vercel.app/api/health`
   Should return: `{"status": "HEALTHY", "system": "Z-Sentinel AI", ...}`
2. **Verify Landing Page:**
   Visit: `https://your-domain.vercel.app/index.html`
3. **Verify Judge Demo Mode:**
   Visit: `https://your-domain.vercel.app/login.html`, click **"Enter Judge Demo"**, and confirm SOC dashboard loads.
4. **Run End-to-End Tests Against Production:**
   ```bash
   BASE_URL="https://your-domain.vercel.app" npx playwright test
   ```
