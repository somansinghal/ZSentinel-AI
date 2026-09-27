# 🔥 Z-Sentinel AI — Firebase Authentication Setup Guide
**Google Sign-In Configuration**  
*IBM Z Datathon 2026*

---

## 1. Overview

Z-Sentinel AI uses **Google Firebase Authentication (Free Spark Tier)** to provide verified, passwordless Google Single Sign-On (SSO) for security analysts.

> **Note for Evaluators:** Setting up your own Firebase account is **optional** for reviewing the software. The built-in **"Enter Judge Demo"** mode on the login page provides immediate, isolated access to the full Security Console without entering any credentials.

---

## 2. Step-by-Step Setup in Firebase Console

1. **Create a Firebase Project:**
   - Navigate to the [Firebase Console](https://console.firebase.google.com/).
   - Click **"Add project"** and name it `z-sentinel-ai` (or your preferred name).
   - Google Analytics can be toggled off (optional).
   - Click **Create project**.

2. **Enable Google Authentication Provider:**
   - In the left sidebar, click **Build** > **Authentication**.
   - Click **"Get Started"**.
   - Under the **Sign-in method** tab, click **Google**.
   - Toggle **Enable**, enter your project support email, and click **Save**.

3. **Configure Authorized Domains:**
   - Under Authentication, click the **Settings** tab > **Authorized domains**.
   - Ensure the following are listed:
     - `localhost`
     - `127.0.0.1`
     - Your Vercel production domain (e.g. `z-sentinel.vercel.app` or `your-project.vercel.app`).

4. **Register Web App & Obtain Config:**
   - Click the gear icon next to **Project Overview** > **Project settings**.
   - In the **General** tab, scroll down to **"Your apps"** and click the Web icon `</>`.
   - Name the app `z-sentinel-web` and click **Register app**.
   - Copy the `firebaseConfig` object:
     ```javascript
     const firebaseConfig = {
       apiKey: "AIzaSy...",
       authDomain: "z-sentinel-ai.firebaseapp.com",
       projectId: "z-sentinel-ai",
       storageBucket: "z-sentinel-ai.appspot.com",
       messagingSenderId: "...",
       appId: "..."
     };
     ```

5. **Apply Configuration:**
   - **Option A (In-Browser):** On `login.html`, click **"Configure Custom Firebase Credentials"**, paste your JSON, and click **Save & Reload**.
   - **Option B (Codebase):** Paste into `public/js/firebase-config.js`.

---

## 3. Security Considerations

Firebase Web Configuration keys (`apiKey`, `projectId`) are public client identifiers used to initialize the client-side Google OAuth handshake. They are protected by Firebase domain authorization rules. Private backend keys (such as `serviceAccountKey.json` or Groq keys) must **never** be included in this client configuration.
