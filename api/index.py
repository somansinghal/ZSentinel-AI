"""
Z-SENTINEL AI — Vercel Serverless Function Entry Point
Routes all /api/* requests to the FastAPI application.
"""

import os
import sys

# Ensure backend directory is in the Python system path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "..", "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

import json
from main import app as fastapi_app

async def app(scope, receive, send):
    """
    ASGI entry point wrapper that handles health checks robustly across
    all Vercel path rewrite representations and delegates to FastAPI.
    """
    if scope.get("type") == "http":
        raw_path = scope.get("path", "")
        # Match health endpoint variants or empty root of API
        if (
            "health" in raw_path
            or raw_path.rstrip("/") in ("/api/health", "/health", "/api", "")
        ):
            body = json.dumps({
                "status": "ok",
                "service": "Z-Sentinel AI",
                "system": "Z-Sentinel AI",
                "event_adapter": "IBM Z Mainframe (Simulated)",
                "security_engine": "Deterministic Rules + ML Active",
                "cloud_ai_fallback": "Available (Optional)",
                "version": "1.0.0"
            }).encode("utf-8")

            await send({
                "type": "http.response.start",
                "status": 200,
                "headers": [
                    (b"content-type", b"application/json"),
                    (b"content-length", str(len(body)).encode("ascii")),
                    (b"access-control-allow-origin", b"*"),
                    (b"access-control-allow-methods", b"GET, HEAD, OPTIONS"),
                    (b"access-control-allow-headers", b"*"),
                ],
            })
            if scope.get("method") != "HEAD":
                await send({
                    "type": "http.response.body",
                    "body": body,
                })
            else:
                await send({
                    "type": "http.response.body",
                    "body": b"",
                })
            return

    await fastapi_app(scope, receive, send)
