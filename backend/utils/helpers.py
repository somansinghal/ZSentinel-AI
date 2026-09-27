"""
Z-SENTINEL AI — Backend Utility Functions
IBM Z Datathon 2026
"""

import hashlib
from datetime import datetime, timezone
from typing import Any, Dict


def get_utc_timestamp() -> str:
    """Returns current UTC timestamp in ISO-8601 format."""
    return datetime.now(timezone.utc).isoformat()


def compute_sha256_hash(payload: str) -> str:
    """Computes a SHA-256 hash string for tamper-evident audit logs."""
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def mask_pan(pan: str) -> str:
    """
    Masks a Primary Account Number to show only the last 4 digits.
    Example: '4929 1102 9481 3210' -> '************3210'
    """
    cleaned = pan.replace(" ", "").replace("-", "")
    if len(cleaned) < 4:
        return "****"
    return "*" * (len(cleaned) - 4) + cleaned[-4:]
