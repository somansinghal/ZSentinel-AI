/**
 * Z-SENTINEL AI — LAYOUT & NAVIGATION CONTROLLER (layout.js)
 * Manages Liquid Glass Topbar, Sidebar collapse, Mobile drawer, and UTC telemetry clock
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigationHighlight();
  initSidebarToggle();
  initLiveClock();
  initNotificationBell();
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Highlights active sidebar item based on current URL
 */
function initNavigationHighlight() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (!href) return;

    // Check match
    const filename = href.split('/').pop();
    if (currentPath.endsWith(filename) || (currentPath.endsWith('/') && filename === 'dashboard.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * Mobile drawer and desktop sidebar collapse
 */
function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 768) {
        document.body.classList.toggle('mobile-sidebar-open');
      } else {
        document.body.classList.toggle('sidebar-collapsed');
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      document.body.classList.remove('mobile-sidebar-open');
    });
  }

  // Close mobile drawer when clicking a nav link
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        document.body.classList.remove('mobile-sidebar-open');
      }
    });
  });
}

/**
 * Live UTC Clock in Topbar/Sidebar
 */
function initLiveClock() {
  const clockEl = document.getElementById('utc-clock');
  function updateTime() {
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toUTCString().slice(17, 25) + ' UTC';
    }
  }
  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * Notification bell interaction
 */
function initNotificationBell() {
  const notifBtn = document.getElementById('btn-notifications');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      window.ZUtils.showToast("3 High-Priority alerts awaiting review in Threat Center", "warning");
    });
  }
}
