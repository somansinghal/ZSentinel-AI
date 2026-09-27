"""
Z-SENTINEL AI — Groq AI Fallback Service
Day 5 Architecture: Optional Natural Language Explanation Provider.
Resilience Rule: System functions locally if Groq key is absent or API is unreachable.
"""

import os

class GroqService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
        self.is_available = bool(self.api_key and not self.api_key.startswith("gsk_your_groq"))
        print(f"[Z-Sentinel AI] GroqService scaffold initialized. Cloud AI Available: {self.is_available}")

    def generate_explanation(self, transaction_id: str, risk_score: int, reasons: list) -> dict:
        """
        Generates natural language explanation.
        Falls back to local explanation engine if Groq is unavailable.
        To be implemented in Day 5.
        """
        return {
            "explanation": f"Transaction {transaction_id} risk score {risk_score}/100 verified by deterministic security rules.",
            "provider": "Local Security Engine"
        }
