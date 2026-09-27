/**
 * Z-SENTINEL AI — TRANSACTIONS MODULE (transactions.js)
 * Day 2 Roadmap: Transaction Simulator, Anomaly Inspector & Stream Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("[Z-Sentinel AI] Transactions module initialized (Day 2 Foundation)");
  initTransactionSimulatorPreview();
});

function initTransactionSimulatorPreview() {
  const btnSimNormal = document.getElementById('btn-sim-normal');
  const btnSimAttack = document.getElementById('btn-sim-attack');

  if (btnSimNormal) {
    btnSimNormal.addEventListener('click', () => {
      window.ZUtils.showToast("Day 2 Simulator: Generating synthetic IBM Z enterprise transaction...", "info");
    });
  }

  if (btnSimAttack) {
    btnSimAttack.addEventListener('click', () => {
      window.ZUtils.showToast("Day 2 Simulator: Attack pattern queued for ingestion...", "warning");
    });
  }
}
