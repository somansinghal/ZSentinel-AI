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

from main import app
