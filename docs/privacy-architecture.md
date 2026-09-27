# 🔏 Z-Sentinel AI — Privacy Guardian Architecture
**Zero-Leakage Mainframe Data Protection Specification**  
*IBM Z Datathon 2026*

---

## 1. Overview & Objectives

In core banking and enterprise transaction workflows powered by IBM Z, transaction records frequently contain sensitive customer data—such as Primary Account Numbers (PAN), Social Security Numbers (SSN), contact details, and account balances. 

The **Privacy Guardian** is a dedicated, high-speed on-premise engine that guarantees **zero data leakage**:
* Sensitive consumer identifiers are intercepted at the ingestion boundary.
* Deterministic pattern recognition applies cryptographic-grade masking before records reach storage or analytical consoles.
* Raw unmasked PII is strictly quarantined and never forwarded to external Large Language Models (such as Groq).

---

## 2. Supported PII Entities & Masking Rules

| PII Entity | Identification Pattern | Severity | Raw Example | Masked Output | Action Enforced |
|---|---|---|---|---|---|
| **Primary Account Number (PAN)** | 15–16 digit payment card numbers (Luhn compliant) | **CRITICAL** | `4929 1102 9481 3210` | `************3210` | Automasked &amp; Audited |
| **National Identity (SSN / Tax ID)** | `\d{3}-\d{2}-\d{4}` (US SSN format) | **CRITICAL** | `987-65-4321` | `***-**-4321` | Automasked &amp; Audited |
| **Customer Phone Number** | E.164, US, &amp; international telephone patterns | **MEDIUM** | `+1 (555) 987-6543` | `+1 (555) ***-6543` | Masked |
| **Customer Email Address** | RFC 5322 standard email address pattern | **MEDIUM** | `sarah.connor@bank.com` | `s***r@bank.com` | Obfuscated |
| **Bank Routing / Account Number** | 9-digit routing / 10–12 digit account numbers | **HIGH** | `123456789012` | `********9012` | Masked |

---

## 3. Ingestion Boundary Architecture

```
+---------------------------------------------------------------------------------+
|                         MAINFRAME INGESTION BOUNDARY                            |
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   | Raw IBM Z CICS Transaction / SMF Audit Record                           |   |
|   | "Wire settlement $94,500.00 for PAN 4929 1102 9481 3210"                |   |
|   +------------------------------------+------------------------------------+   |
|                                        |                                        |
|                                        v                                        |
|   +-------------------------------------------------------------------------+   |
|   | Privacy Guardian Boundary Engine                                        |   |
|   | 1. High-speed regex & pattern matching                                  |   |
|   | 2. Deterministic trailing-digit masking (last 4 retained)               |   |
|   | 3. Emits PII Redaction Audit Log                                        |   |
|   +------------------------------------+------------------------------------+   |
|                                        |                                        |
|                                        v                                        |
|   +-------------------------------------------------------------------------+   |
|   | Sanitized Transaction Payload (SAFE)                                    |   |
|   | "Wire settlement $94,500.00 for PAN ************3210"                   |   |
|   +--------------------+-------------------------------+--------------------+   |
|                        |                               |                        |
|                        v                               v                        |
|          +---------------------------+   +---------------------------+          |
|          | SOC Dashboard & Analytics |   | Server-Side AI Copilot    |          |
|          | (Zero raw PII rendered)   |   | (Zero raw PII transmitted)|          |
|          +---------------------------+   +---------------------------+          |
+---------------------------------------------------------------------------------+
```

---

## 4. Compliance Mapping

* **PCI-DSS Requirement 3.4:** Renders Primary Account Numbers unreadable anywhere they are stored or processed through truncation and masking.
* **GDPR Article 32:** Implements automated technical pseudonymization and encryption of personal data in transit.
* **NIST SP 800-53:** Enforces data minimization and access control on sensitive financial attributes.
