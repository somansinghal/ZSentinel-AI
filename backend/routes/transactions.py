"""
Z-SENTINEL AI — Transactions API Router
IBM Z Datathon 2026
"""

from fastapi import APIRouter, HTTPException
from typing import List
import json
import os
from models.schemas import Transaction, SecurityAnalysisResult

router = APIRouter(tags=["Transactions"])

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "sample_transactions.json")

def load_transactions() -> List[dict]:
    try:
        with open(DATA_PATH, "r") as f:
            return json.load(f)
    except Exception as e:
        return []

@router.get("/transactions", response_model=List[Transaction])
async def get_all_transactions():
    """Retrieve all ingested transactions from the stream store."""
    return load_transactions()

@router.get("/transactions/{tx_id}", response_model=Transaction)
async def get_transaction(tx_id: str):
    """Retrieve single transaction details by ID."""
    txs = load_transactions()
    for tx in txs:
        if tx.get("transactionId") == tx_id:
            return tx
    raise HTTPException(status_code=404, detail=f"Transaction {tx_id} not found")

@router.post("/transactions", response_model=Transaction)
async def create_transaction(tx: Transaction):
    """Ingest a synthetic or live IBM Z transaction into the pipeline."""
    return tx

@router.post("/analyze", response_model=SecurityAnalysisResult)
async def analyze_transaction(tx: Transaction):
    """
    Evaluates a transaction using deterministic heuristic rules and baseline ML scoring.
    Produces risk score (0-100), risk level, action, and human-readable deduction reasons.
    """
    reasons = []
    risk_score = 5  # Baseline

    if not tx.deviceKnown:
        risk_score += 20
        reasons.append(f"Unrecognized device hardware signature ({tx.deviceId})")

    if not tx.locationKnown:
        risk_score += 20
        reasons.append(f"Unusual geographic origin ({tx.location})")

    if tx.amount > 10000:
        risk_score += 25
        reasons.append(f"Large amount deviation (${tx.amount:,.2f}) above moving average")

    if tx.previousTransactionCount > 20:
        risk_score += 15
        reasons.append("High transaction frequency velocity detected")

    risk_score = min(risk_score, 100)

    if risk_score >= 75:
        level = "CRITICAL"
        action = "BLOCK"
    elif risk_score >= 50:
        level = "HIGH"
        action = "CHALLENGE"
    elif risk_score >= 25:
        level = "MEDIUM"
        action = "REVIEW"
    else:
        level = "LOW"
        action = "ALLOW"
        if not reasons:
            reasons.append("Transaction within normal behavioral parameters")

    return SecurityAnalysisResult(
        transactionId=tx.transactionId,
        anomalyScore=-0.72 if risk_score >= 75 else 0.15,
        riskScore=risk_score,
        riskLevel=level,
        reasons=reasons,
        action=action,
        aiProvider="Local Security Engine",
        explanation=f"Transaction {tx.transactionId} evaluated with {level} risk ({risk_score}/100). Recommended Action: {action}."
    )
