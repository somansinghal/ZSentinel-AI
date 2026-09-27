/**
 * Z-SENTINEL AI — JUDGE DEMO TOUR & SCENARIO ENGINE (demo-tour.js)
 * Provides deterministic one-click scenarios and a guided 8-step product walkthrough.
 */

window.ZSentinelTour = {
  currentStep: 0,
  tourSteps: [
    {
      title: "1. Security Operations Center (SOC)",
      desc: "Welcome to Z-Sentinel AI. This dashboard aggregates high-throughput IBM Z telemetry, calculating composite risk scores (0–100) using unsupervised Isolation Forest ML and deterministic heuristic rules.",
      target: ".soc-metrics-grid",
      badge: "Overview"
    },
    {
      title: "2. Suspicious Transaction Ingestion",
      desc: "Transactions arriving from IBM Z CICS/SMF streams are evaluated in sub-millisecond windows. Anomalies trigger real-time rate adjustments and challenge actions.",
      target: "#chart-transactions-timeline",
      badge: "Ingestion Stream"
    },
    {
      title: "3. Composite Risk Scoring",
      desc: "Every event receives an explainable risk score: Low (0–24), Medium (25–49), High (50–74), and Critical (75–100). Scores over 75 automatically freeze transaction settlement.",
      target: "#chart-risk-distribution",
      badge: "Scoring Engine"
    },
    {
      title: "4. Threat Detection Center",
      desc: "Monitors 7 enterprise threat categories including Transaction Bursts, Geo-velocity jumps, Unknown Devices, and Account Takeover patterns.",
      target: "a[href*='threats.html']",
      badge: "Threat Center"
    },
    {
      title: "5. Zero-Leakage Privacy Guardian",
      desc: "Automated regex & pattern detection redacts Primary Account Numbers (PAN), Government IDs (SSN), phone numbers, and corporate emails before logging or AI reasoning.",
      target: "a[href*='privacy.html']",
      badge: "Privacy Guardian"
    },
    {
      title: "6. Resilient AI Copilot",
      desc: "Conversational natural language assistant. Uses local deterministic reasoning with server-side Groq AI fallback. Never sends raw customer PII to external cloud models.",
      target: "a[href*='copilot.html']",
      badge: "AI Copilot"
    },
    {
      title: "7. IBM Z Integration Adapter",
      desc: "Pluggable adapter interface that decouples mainframe transport protocols (CICS, SMF Type 80) into clean event schemas, clearly distinguished between mock streams and live hosts.",
      target: "a[href*='ibmz.html']",
      badge: "IBM Z Adapter"
    },
    {
      title: "8. Immutable Compliance Audit Trail",
      desc: "Every security decision, redaction event, and analyst query is recorded in a tamper-evident audit ledger for regulatory compliance.",
      target: "a[href*='audit.html']",
      badge: "Audit Ledger"
    }
  ],

  start: function() {
    this.currentStep = 0;
    this.renderModal();
  },

  renderModal: function() {
    let modal = document.getElementById('judge-tour-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'judge-tour-modal';
      modal.className = 'judge-tour-modal-backdrop';
      document.body.appendChild(modal);
    }

    const step = this.tourSteps[this.currentStep];
    const isLast = this.currentStep === this.tourSteps.length - 1;

    modal.innerHTML = `
      <div class="judge-tour-card">
        <div class="tour-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-ibmz">${step.badge}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Step ${this.currentStep + 1} of ${this.tourSteps.length}</span>
          </div>
          <button type="button" class="tour-close-btn" onclick="window.ZSentinelTour.close()">✕</button>
        </div>
        <h3 class="tour-title">${step.title}</h3>
        <p class="tour-desc">${step.desc}</p>
        <div class="tour-actions">
          <button type="button" class="btn btn-outline btn-sm" onclick="window.ZSentinelTour.close()">Skip Tour</button>
          <div style="display: flex; gap: 0.5rem;">
            ${this.currentStep > 0 ? `<button type="button" class="btn btn-secondary btn-sm" onclick="window.ZSentinelTour.prev()">Previous</button>` : ''}
            <button type="button" class="btn btn-primary btn-sm" onclick="${isLast ? 'window.ZSentinelTour.close()' : 'window.ZSentinelTour.next()'}">
              ${isLast ? 'Finish Tour' : 'Next Step →'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Highlight target element if present
    document.querySelectorAll('.tour-highlight-active').forEach(el => el.classList.remove('tour-highlight-active'));
    if (step.target) {
      const targetEl = document.querySelector(step.target);
      if (targetEl) {
        targetEl.classList.add('tour-highlight-active');
      }
    }
  },

  next: function() {
    if (this.currentStep < this.tourSteps.length - 1) {
      this.currentStep++;
      this.renderModal();
    }
  },

  prev: function() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderModal();
    }
  },

  close: function() {
    const modal = document.getElementById('judge-tour-modal');
    if (modal) modal.remove();
    document.querySelectorAll('.tour-highlight-active').forEach(el => el.classList.remove('tour-highlight-active'));
  }
};

/**
 * Deterministic One-Click Demo Scenario Injector
 */
window.ZSentinelScenarios = {
  scenarios: {
    NORMAL: {
      name: "NORMAL ACTIVITY",
      txId: "TX-DEMO-001",
      user: "DEMO-USER-001",
      amount: 142.50,
      risk: 12,
      level: "LOW",
      action: "APPROVED",
      reason: "Verified user baseline, recognized local POS terminal DEV-01",
      type: "success"
    },
    SUSPICIOUS: {
      name: "SUSPICIOUS TRANSACTION",
      txId: "TX-DEMO-002",
      user: "DEMO-USER-002",
      amount: 18500.00,
      risk: 62,
      level: "HIGH",
      action: "CHALLENGE",
      reason: "Amount 7.8x above 30-day moving average from new subnet",
      type: "warning"
    },
    BURST: {
      name: "TRANSACTION BURST",
      txId: "TX-DEMO-003",
      user: "DEMO-USER-003",
      amount: 95000.00,
      risk: 88,
      level: "CRITICAL",
      action: "BLOCKED",
      reason: "Velocity spike: 14 rapid wire attempts recorded in 30s",
      type: "error"
    },
    UNKNOWN_DEVICE: {
      name: "UNKNOWN DEVICE",
      txId: "TX-DEMO-004",
      user: "DEMO-USER-001",
      amount: 450.00,
      risk: 42,
      level: "MEDIUM",
      action: "CHALLENGE",
      reason: "New hardware fingerprint DEV-99 with unverified browser canvas",
      type: "warning"
    },
    UNUSUAL_LOCATION: {
      name: "UNUSUAL LOCATION",
      txId: "TX-DEMO-005",
      user: "DEMO-USER-002",
      amount: 1200.00,
      risk: 68,
      level: "HIGH",
      action: "CHALLENGE",
      reason: "Impossible geographic travel: New York to Zurich in 15 minutes",
      type: "warning"
    },
    ATO: {
      name: "POTENTIAL ACCOUNT TAKEOVER",
      txId: "TX-DEMO-006",
      user: "DEMO-USER-003",
      amount: 48000.00,
      risk: 94,
      level: "CRITICAL",
      action: "BLOCKED",
      reason: "5 consecutive failed authentications followed by immediate wire out",
      type: "error"
    },
    PII: {
      name: "PII EXPOSURE",
      txId: "TX-DEMO-007",
      user: "DEMO-USER-001",
      amount: 320.00,
      risk: 48,
      level: "MEDIUM",
      action: "REDACTED",
      reason: "Unmasked PAN 4929 1102 9481 3210 redacted to ************3210",
      type: "info"
    },
    IBMZ_EVENT: {
      name: "IBM Z SECURITY EVENT",
      txId: "IBMZ-DEMO-001",
      user: "SYSTEM-RACF",
      amount: 0.00,
      risk: 76,
      level: "HIGH",
      action: "FLAGGED",
      reason: "SMF Type 80: RACF resource access violation on CICS trans SYS1",
      type: "warning"
    }
  },

  trigger: function(scenarioKey) {
    const s = this.scenarios[scenarioKey];
    if (!s) return;

    window.ZUtils.showToast(`Simulating ${s.name}: ${s.txId} [Risk: ${s.risk}/100 - ${s.action}]`, s.type, 5000);

    // Prepend to live stream table if present
    const tableBody = document.querySelector('.data-table tbody');
    if (tableBody) {
      const row = document.createElement('tr');
      row.style.animation = 'toastIn 0.4s ease';
      row.innerHTML = `
        <td class="mono" style="color: var(--text-white); font-weight: 700;">${s.txId}</td>
        <td><strong>${s.name}</strong></td>
        <td><span class="badge ${s.level === 'CRITICAL' ? 'badge-critical' : (s.level === 'HIGH' ? 'badge-high' : 'badge-low')}">${s.level}</span></td>
        <td><span class="mono" style="font-weight: 700; color: ${s.risk >= 75 ? '#ef4444' : (s.risk >= 50 ? '#f97316' : '#10b981')}">${s.risk}/100</span></td>
        <td class="mono" style="color: var(--color-accent);">${s.user}</td>
        <td style="font-size: 0.78rem;">${s.reason}</td>
        <td><span class="badge ${s.action === 'BLOCKED' ? 'badge-critical' : 'badge-low'}">${s.action}</span></td>
        <td><span class="badge badge-medium">SIMULATED</span></td>
      `;
      tableBody.prepend(row);
    }
  }
};
