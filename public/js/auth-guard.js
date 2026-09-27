/**
 * Z-SENTINEL AI — AUTH GUARD (auth-guard.js)
 * Protects Security Console and internal modules from unauthenticated access.
 * Enforces Judge Demo Mode isolation and persistent synthetic watermark banner.
 */

(function initAuthGuard() {
  function redirectUnauthenticated() {
    const isSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/legal/');
    const loginTarget = isSubdir ? '../login.html' : 'login.html';
    const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(`${loginTarget}?redirect=${currentPath}`);
  }

  function renderJudgeDemoBanner(user) {
    if (!user.isJudgeDemo) return;

    // Check if banner already rendered
    if (document.getElementById('judge-demo-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'judge-demo-banner';
    banner.className = 'judge-demo-persistent-banner';
    banner.innerHTML = `
      <div class="judge-banner-content">
        <div class="judge-banner-left">
          <span class="judge-badge"><i data-lucide="shield-check" style="width: 14px; height: 14px;"></i> JUDGE DEMO MODE</span>
          <span class="judge-banner-text">All data shown in this environment is synthetic and intended for demonstration purposes.</span>
        </div>
        <div class="judge-banner-right">
          <button type="button" class="btn-tour-trigger" id="btn-trigger-guided-tour">
            <i data-lucide="compass" style="width: 13px; height: 13px;"></i>
            <span>Guided Tour</span>
          </button>
          <button type="button" class="btn-exit-demo" id="btn-exit-judge-demo">
            <i data-lucide="log-out" style="width: 13px; height: 13px;"></i>
            <span>Exit Demo Mode</span>
          </button>
        </div>
      </div>
    `;

    const topbar = document.querySelector('.glass-topbar');
    if (topbar && topbar.nextSibling) {
      topbar.parentNode.insertBefore(banner, topbar.nextSibling);
    } else {
      document.body.prepend(banner);
    }

    // Attach exit handler
    const exitBtn = document.getElementById('btn-exit-judge-demo');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        window.ZSentinelAuth.exitJudgeDemo();
      });
    }

    // Attach guided tour handler
    const tourBtn = document.getElementById('btn-trigger-guided-tour');
    if (tourBtn && window.ZSentinelTour) {
      tourBtn.addEventListener('click', () => {
        window.ZSentinelTour.start();
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function populateUserProfile(user) {
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    const emailEl = document.getElementById('user-email');
    const logoutBtn = document.getElementById('btn-logout');

    if (avatarEl && user.photoURL) {
      avatarEl.src = user.photoURL;
      avatarEl.alt = user.displayName;
    }
    if (nameEl) {
      nameEl.textContent = user.displayName;
    }
    if (emailEl) {
      emailEl.textContent = user.isJudgeDemo 
        ? `${user.email} (DEMO)` 
        : (user.isDemo ? `${user.email} (DEMO)` : user.email);
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (user.isJudgeDemo) {
          window.ZSentinelAuth.exitJudgeDemo();
        } else {
          window.ZSentinelAuth.signOut();
        }
      });
    }

    // Render persistent banner if in Judge Demo Mode
    renderJudgeDemoBanner(user);
  }

  // Check state
  const currentUser = window.ZSentinelAuth.getUser();
  if (currentUser) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => populateUserProfile(currentUser));
    } else {
      populateUserProfile(currentUser);
    }
  } else {
    // Check if Firebase session is restoring
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved && !window.ZSentinelAuth.getUser()) {
        console.warn("[Z-Sentinel AI] Access denied: User unauthenticated. Redirecting to login...");
        redirectUnauthenticated();
      }
    }, 1200);

    window.ZSentinelAuth.onAuthStateChange((user) => {
      resolved = true;
      clearTimeout(timeout);
      if (user) {
        populateUserProfile(user);
      } else {
        console.warn("[Z-Sentinel AI] No active authentication session found.");
        redirectUnauthenticated();
      }
    });
  }
})();
