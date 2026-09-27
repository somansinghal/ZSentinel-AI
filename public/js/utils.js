/**
 * Z-SENTINEL AI — UTILITIES & HELPERS
 */

window.ZUtils = {
  /**
   * Display toast notification
   * @param {string} message 
   * @param {'success'|'error'|'info'|'warning'} type 
   * @param {number} duration 
   */
  showToast: function(message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';
    if (type === 'warning') iconName = 'alert-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" style="width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px;"></i>
      <div style="flex: 1;">${this.escapeHtml(message)}</div>
      <button style="background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0 4px;" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);
    if (window.lucide) {
      window.lucide.createIcons();
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Format currency USD
   */
  formatCurrency: function(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  },

  /**
   * Format risk score into HTML badge
   */
  getRiskBadge: function(score) {
    let cls = 'badge-low';
    let label = 'LOW';
    if (score >= 75) {
      cls = 'badge-critical';
      label = 'CRITICAL';
    } else if (score >= 50) {
      cls = 'badge-high';
      label = 'HIGH';
    } else if (score >= 25) {
      cls = 'badge-medium';
      label = 'MEDIUM';
    }
    return `<span class="badge ${cls}"><span class="pulse-dot ${score >= 50 ? 'pulse-dot-red' : 'pulse-dot-green'}"></span>${label} (${score})</span>`;
  },

  /**
   * Mask sensitive string
   */
  maskValue: function(val, visibleTail = 4) {
    if (!val || val.length <= visibleTail) return '****';
    const head = '*'.repeat(val.length - visibleTail);
    return head + val.slice(-visibleTail);
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml: function(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Format ISO timestamp to readable UTC date
   */
  formatTime: function(isoString) {
    try {
      const d = isoString ? new Date(isoString) : new Date();
      return d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    } catch (e) {
      return isoString || 'N/A';
    }
  }
};
