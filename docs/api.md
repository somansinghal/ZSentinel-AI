# 📡 Z-Sentinel AI — REST API Documentation
**Enterprise Security & Privacy Guardian for IBM Z**  
*Base URL: `/api`*

---

## 1. System Health

### `GET /api/health`
* **Purpose:** System heartbeat and subsystem operational health check.
* **Request:** None
* **Response (200 OK):**
  ```json
  {
    "status": "HEALTHY",
    "system": "Z-Sentinel AI",
    "event_adapter": "IBM Z Mainframe (Simulated)",
    "security_engine": "Deterministic Rules + ML Active",
    "cloud_ai_fallback": "Available (Optional)",
    "version": "1.0.0"
  }
  ```
* **Errors:** `500 Internal Server Error` if backend is unreachable.

---

## 2. Security Analysis Engine

### `POST /api/analyze`
* **Purpose:** Evaluates an incoming transaction against heuristic security rules and Isolation Forest anomaly models.
* **Request Body:**
  ```json
  {
    "transactionId": "TX-83921",
    "userId": "USR-7741",
    "amount": 94500.0,
    "timestamp": "2026-09-27T09:42:00Z",
    "location": "Zurich, CHE",
    "ipAddress": "194.209.12.8",
    "deviceId": "DEV-99",
    "transactionType": "WIRE_TRANSFER",
    "accountType": "COMMERCIAL_CHECKING",
    "previousTransactionCount": 42,
    "deviceKnown": false,
    "locationKnown": false,
    "memo": "Outbound cross-border settlement for invoice #9012"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "transactionId": "TX-83921",
    "anomalyScore": -0.72,
    "riskScore": 88,
    "riskLevel": "CRITICAL",
    "reasons": [
      "Unrecognized device hardware signature (DEV-99)",
      "Unusual geographic origin (Zurich, CHE)",
      "Large amount deviation ($94,500.00) above moving average",
      "High transaction frequency velocity detected"
    ],
    "action": "BLOCK",
    "aiProvider": "Local Security Engine",
    "explanation": "Transaction TX-83921 evaluated with CRITICAL risk (88/100). Recommended Action: BLOCK."
  }
  ```
* **Errors:** `422 Unprocessable Entity` for malformed schema payloads.

---

## 3. Transaction Stream Management

### `GET /api/transactions`
* **Purpose:** Retrieves historical and recently ingested transaction records.
* **Request:** None
* **Response (200 OK):**
  ```json
  [
    {
      "transactionId": "TX-83921",
      "userId": "USR-7741",
      "amount": 94500.0,
      "timestamp": "2026-09-27T09:42:00Z",
      "location": "Zurich, CHE",
      "ipAddress": "194.209.12.8",
      "deviceId": "DEV-99",
      "transactionType": "WIRE_TRANSFER",
      "accountType": "COMMERCIAL_CHECKING",
      "previousTransactionCount": 42,
      "deviceKnown": false,
      "locationKnown": false,
      "memo": "Outbound settlement"
    }
  ]
  ```

### `POST /api/transactions`
* **Purpose:** Ingests a new synthetic or stream transaction payload into the buffer.
* **Request Body:** Transaction object (same schema as above).
* **Response (200 OK):** Returns the ingested transaction object with timestamp verification.

---

## 4. Privacy Guardian & Data Masking

### `POST /api/privacy`
* **Purpose:** Intercepts sensitive transaction text, applies deterministic boundary masking to PAN, SSN, email, and phone numbers, and logs redaction metadata.
* **Request Body:**
  ```json
  {
    "text": "Wire memo: Account 4929 1102 9481 3210 SSN 987-65-4321 contact sarah@bank.com"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "sanitizedText": "Wire memo: Account ************3210 SSN ***-**-4321 contact s***h@bank.com",
    "detections": [
      {
        "piiType": "PRIMARY_ACCOUNT_NUMBER",
        "severity": "HIGH",
        "originalPattern": "4929 1102 9481 3210",
        "maskedValue": "************3210",
        "action": "MASKED",
        "timestamp": "2026-09-27T09:42:10Z"
      }
    ],
    "totalRedactions": 3
  }
  ```

---

## 5. AI Security Copilot

### `POST /api/copilot`
* **Purpose:** Natural language conversational reasoning interface for security analysts.
* **Request Body:**
  ```json
  {
    "query": "Why was transaction TX-83921 blocked?",
    "transactionId": "TX-83921",
    "allowCloudFallback": true
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "response": "Transaction TX-83921 was blocked because it triggered 3 concurrent critical indicators: (1) Velocity burst of 12 rapid wire transfers in 35 seconds, (2) Unregistered hardware signature DEV-99, and (3) Impossible geographic vector (New York to Zurich in 15 minutes).",
    "provider": "Local Security Engine",
    "reasoningSteps": [
      "Queried local transaction ledger for TX-83921",
      "Extracted risk factors: VelocityBurst (+25), UnknownDevice (+20), GeoJump (+25)",
      "Confirmed automated containment action: BLOCKED"
    ],
    "executionTimeMs": 8.5
  }
  ```

---

## 6. Threat Intelligence & IBM Z Stream

### `GET /api/threats`
* **Purpose:** Returns active incident cards in the SOC threat queue awaiting analyst review.
* **Response (200 OK):** List of `ThreatEvent` objects containing severity, score, affected TX, reasons, and status.

### `GET /api/ibmz/events`
* **Purpose:** Streams recent mainframe telemetry events from CICS, IMS, and RACF/SMF adapters.
* **Response (200 OK):** List of IBM Z telemetry events with subsystem tags and anomaly indicators.
