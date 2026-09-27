"""
Z-SENTINEL AI — Threat Detection API Router
IBM Z Datathon 2026
"""

from fastapi import APIRouter
from typing import List
from models.schemas import ThreatEvent

router = APIRouter(prefix="/threats", tags=["Threats"])

# Baseline Day 1 sample threat events
SAMPLE_THREATS = [
    {
        "threatId": "THR-9014",
        "threatType": "Transaction Burst",
        "severity": "CRITICAL",
        "riskScore": 88,
        "affectedTransaction": "TX-83921",
        "reasons": [
            "Velocity burst: 12 transactions in 35 seconds",
            "Unrecognized device DEV-99",
            "Geographic anomaly (Zurich CHE)"
        ],
        "recommendedAction": "Maintain account freeze and trigger analyst review",
        "timestamp": "2026-09-27T09:42:00Z",
        "status": "INVESTIGATING"
    },
    {
        "threatId": "THR-9013",
        "threatType": "Unusual Location",
        "severity": "HIGH",
        "riskScore": 64,
        "affectedTransaction": "TX-83918",
        "reasons": [
            "Geographic jump: NYC to Tokyo in 14 minutes",
            "IP subnet mismatch"
        ],
        "recommendedAction": "Issue out-of-band push authentication challenge",
        "timestamp": "2026-09-27T09:35:45Z",
        "status": "NEW"
    }
]

@router.get("/", response_model=List[ThreatEvent])
async def get_threats():
    """List detected security threats awaiting triage."""
    return SAMPLE_THREATS
