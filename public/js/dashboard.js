/**
 * Z-SENTINEL AI — DASHBOARD CONTROLLER (dashboard.js)
 * IBM Z Security Operations Center Metrics & Visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardMetrics();
  initDashboardCharts();
  initDashboardActions();
});

// Initial SOC State (Day 1 baseline state)
const socState = {
  totalTransactions: 142850,
  analyzedTransactions: 142850,
  threatsDetected: 38,
  criticalThreats: 4,
  blockedTransactions: 12,
  privacyViolations: 19,
  securityScore: 94.6
};

function initDashboardMetrics() {
  const elTotal = document.getElementById('metric-total-tx');
  const elAnalyzed = document.getElementById('metric-analyzed-tx');
  const elThreats = document.getElementById('metric-threats');
  const elCritical = document.getElementById('metric-critical');
  const elBlocked = document.getElementById('metric-blocked');
  const elPrivacy = document.getElementById('metric-privacy');
  const elScore = document.getElementById('metric-security-score');

  if (elTotal) elTotal.textContent = socState.totalTransactions.toLocaleString();
  if (elAnalyzed) elAnalyzed.textContent = socState.analyzedTransactions.toLocaleString();
  if (elThreats) elThreats.textContent = socState.threatsDetected.toLocaleString();
  if (elCritical) elCritical.textContent = socState.criticalThreats.toLocaleString();
  if (elBlocked) elBlocked.textContent = socState.blockedTransactions.toLocaleString();
  if (elPrivacy) elPrivacy.textContent = socState.privacyViolations.toLocaleString();
  if (elScore) elScore.textContent = socState.securityScore.toFixed(1);
}

function initDashboardCharts() {
  if (typeof Chart === 'undefined') {
    console.warn("Chart.js not loaded. Skipping chart rendering.");
    return;
  }

  // Chart defaults for Cyber Dark Palette
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Outfit', sans-serif";

  // 1. Transactions Over Time (Line Chart)
  const txCanvas = document.getElementById('chart-transactions-timeline');
  if (txCanvas) {
    new Chart(txCanvas, {
      type: 'line',
      data: {
        labels: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],
        datasets: [{
          label: 'IBM Z Ingested Events/sec',
          data: [1200, 1900, 3100, 4800, 7200, 6800, 8450],
          borderColor: '#00f0ff',
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#00f0ff'
        }, {
          label: 'Flagged Anomalies',
          data: [1, 2, 5, 8, 14, 9, 12],
          borderColor: '#ef4444',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [4, 4],
          pointRadius: 4,
          pointBackgroundColor: '#ef4444'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.04)' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.04)' } }
        }
      }
    });
  }

  // 2. Risk Distribution (Doughnut Chart)
  const riskCanvas = document.getElementById('chart-risk-distribution');
  if (riskCanvas) {
    new Chart(riskCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Low (0-24)', 'Medium (25-49)', 'High (50-74)', 'Critical (75-100)'],
        datasets: [{
          data: [88, 8, 3, 1],
          backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
        },
        cutout: '72%'
      }
    });
  }

  // 3. Threat Types Breakdown (Bar Chart)
  const threatsCanvas = document.getElementById('chart-threat-types');
  if (threatsCanvas) {
    new Chart(threatsCanvas, {
      type: 'bar',
      data: {
        labels: ['Burst', 'Unknown Device', 'Unusual Loc', 'Auth Spike', 'PII Leak'],
        datasets: [{
          label: 'Incidents (Last 24h)',
          data: [14, 11, 7, 5, 19],
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          hoverBackgroundColor: '#00f0ff',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, beginAtZero: true }
        }
      }
    });
  }
}

function initDashboardActions() {
  const btnRefresh = document.getElementById('btn-refresh-telemetry');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      btnRefresh.innerHTML = `<i data-lucide="loader" class="spinner" style="width: 14px; height: 14px;"></i> Ingesting...`;
      setTimeout(() => {
        socState.totalTransactions += Math.floor(Math.random() * 25) + 5;
        socState.analyzedTransactions = socState.totalTransactions;
        initDashboardMetrics();
        btnRefresh.innerHTML = `<i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i> Live Stream Sync`;
        if (window.lucide) window.lucide.createIcons();
        window.ZUtils.showToast("IBM Z Event Stream synced. Telemetry up-to-date.", "success");
      }, 700);
    });
  }
}
