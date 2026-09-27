# 💻 Z-Sentinel AI — Local Development Guide
**Running Frontend & Backend Locally**  
*IBM Z Datathon 2026*

---

## 1. System Requirements
* Python 3.10+
* Modern web browser (Chrome, Edge, Firefox, Safari)
* Node.js v18+ (Only for running Playwright end-to-end tests)

---

## 2. Running Frontend Locally (Standalone)

The frontend uses native HTML5, CSS3, and ES6 JavaScript with **no compilation, no Vite, and no bundler**:

```bash
# Option A: Built-in Python static server
cd public
python3 -m http.server 3000

# Open in browser:
# http://localhost:3000/index.html
```

---

## 3. Running Backend (FastAPI Server)

```bash
cd backend

# 1. Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create .env configuration
cp .env.example .env

# 4. Start the FastAPI ASGI server
python3 main.py
```
* **Application & Static UI:** `http://localhost:8000`
* **Swagger API Docs:** `http://localhost:8000/api/docs`
* **Health Endpoint:** `http://localhost:8000/api/health`

---

## 4. Testing Judge Demo Locally
1. Start the server and visit `http://localhost:8000/login.html`.
2. Click **"Enter Judge Demo"**.
3. The isolated demo session is activated in local storage without requiring real Google authentication.
