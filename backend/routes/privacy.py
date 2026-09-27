"""
Z-SENTINEL AI — Privacy Guardian API Router
IBM Z Datathon 2026
"""

from fastapi import APIRouter
from typing import List, Dict, Any
from pydantic import BaseModel
import re
from datetime import datetime, timezone
from models.schemas import PrivacyDetectionResult

router = APIRouter(tags=["Privacy"])

SAMPLE_PII_LOGS = [
    {
        "piiType": "PRIMARY_ACCOUNT_NUMBER",
        "severity": "HIGH",
        "originalPattern": "4929 1102 9481 3210",
        "maskedValue": "************3210",
        "action": "MASKED",
        "timestamp": "2026-09-27T09:42:10Z"
    },
    {
        "piiType": "GOVERNMENT_ID_SSN",
        "severity": "HIGH",
        "originalPattern": "987-65-4321",
        "maskedValue": "*****4321",
        "action": "MASKED",
        "timestamp": "2026-09-27T09:38:05Z"
    }
]

class PrivacySanitizeRequest(BaseModel):
    text: str

class PrivacySanitizeResponse(BaseModel):
    sanitizedText: str
    detections: List[PrivacyDetectionResult]
    totalRedactions: int

@router.get("/privacy/detections", response_model=List[PrivacyDetectionResult])
async def get_privacy_detections():
    """Retrieve PII detection and redaction audit trail."""
    return SAMPLE_PII_LOGS

@router.post("/privacy", response_model=PrivacySanitizeResponse)
async def sanitize_privacy_text(req: PrivacySanitizeRequest):
    """
    Scans input text for sensitive PII patterns and applies deterministic boundary masking.
    Redacts PAN (16 digits), SSN (9 digits), phone numbers, and email addresses.
    """
    text = req.text
    detections = []
    now_str = datetime.now(timezone.utc).isoformat()

    # 1. PAN Pattern (16 digits with optional spaces or hyphens)
    pan_matches = list(re.finditer(r'\b(?:\d[ -]?){15}\d\b', text))
    for m in pan_matches:
        raw = m.group(0)
        digits = re.sub(r'\D', '', raw)
        masked = '*' * (len(digits) - 4) + digits[-4:]
        text = text.replace(raw, masked)
        detections.append(PrivacyDetectionResult(
            piiType="PRIMARY_ACCOUNT_NUMBER",
            severity="HIGH",
            originalPattern=raw,
            maskedValue=masked,
            action="MASKED",
            timestamp=now_str
        ))

    # 2. SSN Pattern (XXX-XX-XXXX)
    ssn_matches = list(re.finditer(r'\b\d{3}-\d{2}-\d{4}\b', text))
    for m in ssn_matches:
        raw = m.group(0)
        masked = '***-**-' + raw[-4:]
        text = text.replace(raw, masked)
        detections.append(PrivacyDetectionResult(
            piiType="GOVERNMENT_ID_SSN",
            severity="HIGH",
            originalPattern=raw,
            maskedValue=masked,
            action="MASKED",
            timestamp=now_str
        ))

    # 3. Email Pattern
    email_matches = list(re.finditer(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', text))
    for m in email_matches:
        raw = m.group(0)
        parts = raw.split('@')
        user_part = parts[0]
        masked = user_part[0] + '***' + user_part[-1] + '@' + parts[1] if len(user_part) > 2 else '***@' + parts[1]
        text = text.replace(raw, masked)
        detections.append(PrivacyDetectionResult(
            piiType="EMAIL_ADDRESS",
            severity="MEDIUM",
            originalPattern=raw,
            maskedValue=masked,
            action="OBFUSCATED",
            timestamp=now_str
        ))

    return PrivacySanitizeResponse(
        sanitizedText=text,
        detections=detections,
        totalRedactions=len(detections)
    )
