# 🧠 Z-Sentinel AI — AI & Machine Learning Architecture
**Multi-Layered Cyber Defense for IBM Z**  
*IBM Z Datathon 2026*

---

## 1. Why Z-Sentinel AI Does Not Rely Exclusively on LLMs

In high-throughput enterprise banking environments powered by IBM Z mainframes (processing tens of thousands of transactions per second), **relying solely on a cloud Large Language Model (LLM) introduces severe architectural vulnerabilities**:
1. **Latency:** Cloud LLM API inference incurs 300ms to 2000ms latency—unacceptable for sub-millisecond core banking authorization decisions.
2. **Reliability & Uptime:** Cloud APIs suffer network jitter, rate limiting, outages, and downtime. A mainframe security guardian must remain 100% operational offline.
3. **Data Privacy:** Forwarding unredacted transactional records containing account numbers or consumer PII to cloud LLMs violates strict PCI-DSS, GDPR, and financial compliance regulations.
4. **Non-Determinism:** LLMs hallucinate and produce variable answers to identical inputs. Core security decisions require audited, explainable, deterministic outputs.

Therefore, Z-Sentinel AI implements a **Layered Hybrid AI Architecture**:

---

## 2. Feature Extraction & Engineering

Transactions ingested from IBM Z streams are vectorized into 9 numerical and boolean features:
* `amount`: Transaction monetary value (USD).
* `amount_deviation`: Ratio of current transaction amount to the user's 90-day moving average.
* `transaction_frequency`: Number of events in the preceding 60-second window.
* `transaction_hour`: Time of day (0–23) mapped to cyclic sine/cosine curves.
* `device_known`: Binary flag indicating whether the hardware fingerprint exists in historical records.
* `location_known`: Binary flag indicating whether the origin IP resolves to a known home or work region.
* `location_deviation`: Geographical distance (km) divided by time elapsed since last verified authentication (impossible travel speed).
* `failed_attempts`: Number of consecutive failed authentications preceding the transaction.
* `previous_transaction_count`: Historical volume baseline.

---

## 3. Unsupervised Anomaly Detection: Isolation Forest

Z-Sentinel AI uses the **Isolation Forest** algorithm (`sklearn.ensemble.IsolationForest`):
* **Why Isolation Forest?** Anomalies in financial streams are "few and different". Isolation Forest isolates anomalies by randomly selecting features and splitting values. Normal points require deep tree traversals, whereas anomalous transactions are isolated near the root of the trees.
* **Scoring:** Produces a continuous anomaly score between -1.0 (extreme anomaly) and +1.0 (completely normal).

---

## 4. Rule-Based Heuristic Risk Engine

Machine learning outputs are paired with deterministic heuristic security rules:
* Unknown Device: `+20 Risk`
* Impossible Geographic Velocity Jump: `+20 Risk`
* Large Amount Deviation (>5x normal): `+25 Risk`
* High-Frequency Burst (>10 tx/min): `+25 Risk`
* Multiple Failed Logins: `+15 Risk`

The rule engine and ML score combine into a final composite **Risk Score (0–100)**:
* **0 – 24 (LOW):** Verified patterns. Transaction allowed automatically.
* **25 – 49 (MEDIUM):** Slight deviation. Transaction logged for secondary review.
* **50 – 74 (HIGH):** Significant risk. Multi-factor challenge triggered.
* **75 – 100 (CRITICAL):** Extreme anomaly. Instant automated settlement freeze & block.

---

## 5. Local Explanation Engine

Every flagged transaction is immediately accompanied by deterministic explanation deductions. For instance:
```
Transaction TX-83921 was blocked because:
1. Velocity burst: 12 wire requests in 35 seconds (+25 Risk).
2. Hardware signature DEV-99 is unrecognized (+20 Risk).
3. Geographical origin (Zurich) inconsistent with previous login in New York (+25 Risk).
4. Isolation Forest anomaly score: -0.84.
```

---

## 6. Groq AI Optional Enhancement & Resilient Fallback

* **Role of Groq:** Groq AI serves exclusively on the server-side as an optional natural language explainer and conversational assistant for SOC analysts.
* **Zero PII Exposure:** Memos and names are pre-redacted by the Privacy Guardian before dispatching prompts to Groq.
* **Fail-Safe Fallback:** If the `GROQ_API_KEY` is omitted, expires, or returns an HTTP error, the system seamlessly defaults to the local explanation engine without displaying errors or interrupting SOC operations.

---

## 7. Human Oversight ("Human-in-the-Loop")

Z-Sentinel AI is an assistive decision-support guardian. While critical transactions can be temporarily frozen to prevent instantaneous fraud drain, final forensic determinations and account locks must always be confirmed by human security analysts.
