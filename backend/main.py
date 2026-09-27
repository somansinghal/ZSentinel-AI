"""
Z-SENTINEL AI — FastAPI Backend Application
IBM Z Datathon 2026
Tagline: "Detect threats. Protect data. Decide safely."
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Import API Routers
from routes.transactions import router as transactions_router
from routes.threats import router as threats_router
from routes.privacy import router as privacy_router
from routes.copilot import router as copilot_router
from routes.ibmz import router as ibmz_router

app = FastAPI(
    title="Z-Sentinel AI — Security & Privacy Guardian for IBM Z",
    description="Backend API for real-time mainframe anomaly detection, privacy redaction, and resilient AI reasoning.",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(transactions_router, prefix="/api")
app.include_router(threats_router, prefix="/api")
app.include_router(privacy_router, prefix="/api")
app.include_router(copilot_router, prefix="/api")
app.include_router(ibmz_router, prefix="/api")

# System Health Check
@app.get("/api/health")
@app.head("/api/health")
async def health_check():
    """System health check endpoint."""
    return {
        "status": "ok",
        "service": "Z-Sentinel AI",
        "system": "Z-Sentinel AI",
        "event_adapter": "IBM Z Mainframe (Simulated)",
        "security_engine": "Deterministic Rules + ML Active",
        "cloud_ai_fallback": "Available (Optional)",
        "version": "1.0.0"
    }

# Optionally mount static public files if running monolithic server
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "..", "public")
if not os.path.exists(PUBLIC_DIR):
    PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(PUBLIC_DIR):
    app.mount("/", StaticFiles(directory=PUBLIC_DIR, html=True), name="static_site")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"🚀 Starting Z-Sentinel AI Backend on http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)
