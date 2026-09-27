# 🏢 Z-Sentinel AI — IBM Z Mainframe Integration
**Adapter Architecture & Telemetry Pipeline**  
*IBM Z Datathon 2026*

---

## 1. Architectural Positioning & Honest Disclosures

* **Current Implementation (Demo / Datathon):** Simulated IBM Z event stream. High-velocity synthetic mainframe transactions representing realistic CICS transaction logs, IMS payroll feeds, and SMF Type 80 RACF security records.
* **Target / Production Architecture:** Direct connection to IBM z/OS via z/OSMF REST services, IBM Z Common Data Provider (CDP), or direct TCP socket streaming from CICS/SMF partitions.

> **Truth-in-Advertising Notice:** Z-Sentinel AI does not claim active production deployment on real enterprise mainframes. The software provides an enterprise-ready adapter layer designed to interface seamlessly with real IBM Z / Xplore environments when host credentials are provided.

---

## 2. Decoupled Adapter Architecture

```
+---------------------------------------------------------------------------------+
|                           IBM Z INTEGRATION ADAPTER                             |
|                                                                                 |
|   +------------------------------------+   +--------------------------------+   |
|   | Target A: Simulated Event Stream   |   | Target B: IBM z/OSMF REST API  |   |
|   | (Default Datathon Ingestion Mode)  |   | (Target Production Connection) |   |
|   | - 2,140 synthetic events/sec       |   | - HTTPS port 9443              |   |
|   | - Realistic CICS & SMF payloads    |   | - RACF certificate auth        |   |
|   +-----------------+------------------+   +---------------+----------------+   |
|                     |                                      |                    |
|                     +-------------------+------------------+                    |
|                                         |                                       |
|                                         v                                       |
|                      +-------------------------------------+                    |
|                      | Z-Sentinel Integration Adapter Layer|                    |
|                      | - Normalizes disparate records      |                    |
|                      | - Buffers into ring queue           |                    |
|                      | - Emits normalized Transaction JSON |                    |
|                      +------------------+------------------+                    |
|                                         |                                       |
|                                         v                                       |
|                      +-------------------------------------+                    |
|                      | Security & Privacy Pipeline         |                    |
|                      | (Isolation Forest + Rule Engine)    |                    |
|                      +-------------------------------------+                    |
+---------------------------------------------------------------------------------+
```

---

## 3. Mainframe Record Types Supported

1. **CICS Transaction Streams (Type 110 SMF):**
   - Captures high-frequency online banking transactions (POS payments, wire dispatches, ATM withdrawals).
   - Monitors transaction ID, response times, terminal identifiers, and CPU usage spikes.
2. **RACF Security Audit Records (Type 80 SMF):**
   - Captures access control events, unauthorized resource access attempts, and authentication failures.
   - Feeds directly into the Account Takeover (ATO) and Credential Stuffing threat detectors.
3. **DB2 / IMS Database Logs (Type 101/102 SMF):**
   - Monitors mass export queries and cross-table customer record access for privacy leak detection.

---

## 4. Configuring Mainframe Connection Mode

In `backend/.env`:
```bash
# Toggle between synthetic simulation and live host
IBMZ_STREAM_MODE=simulated     # 'simulated' or 'live'
IBMZ_HOST=127.0.0.1
IBMZ_PORT=5050
```
When `IBMZ_STREAM_MODE=simulated`, the Security Console prominently displays the watermark:  
`"SIMULATION MODE: DEMO / SIMULATED IBM Z EVENT STREAM"`.
