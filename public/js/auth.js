/**
 * Z-SENTINEL AI — AUTHENTICATION SERVICE (auth.js)
 * Implements Firebase Authentication + Google Sign-In & Isolated Judge Demo Mode
 */

const DEMO_USER_KEY = 'zsentinel_demo_user';
const JUDGE_DEMO_KEY = 'zsentinel_judge_demo_mode';

window.ZSentinelAuth = {
  /**
   * Check if current user is logged in (Firebase, Judge Demo, or Evaluator)
   */
  getUser: function() {
    // 1. Check if Judge Demo is active (Completely isolated environment)
    if (this.isJudgeDemo()) {
      return {
        uid: 'DEMO-JUDGE-001',
        displayName: 'IBM Z Datathon Judge',
        email: 'judge.evaluator@datathon.demo',
        photoURL: window.location.pathname.includes('/pages/') || window.location.pathname.includes('/legal/') 
          ? '../assets/z-sentinel-logo.png' 
          : 'assets/z-sentinel-logo.png',
        isDemo: true,
        isJudgeDemo: true,
        role: 'Datathon Evaluator'
      };
    }

    // 2. Check Firebase User
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
      const u = firebase.auth().currentUser;
      return {
        uid: u.uid,
        displayName: u.displayName || 'Security Analyst',
        email: u.email || 'analyst@ibmz.org',
        photoURL: u.photoURL || (window.location.pathname.includes('/pages/') || window.location.pathname.includes('/legal/') 
          ? '../assets/z-sentinel-logo.png' 
          : 'assets/z-sentinel-logo.png'),
        isDemo: false,
        isJudgeDemo: false,
        role: 'Security Analyst'
      };
    }
    
    // 3. Check legacy demo user
    const demo = localStorage.getItem(DEMO_USER_KEY);
    if (demo) {
      try {
        return JSON.parse(demo);
      } catch (e) {
        localStorage.removeItem(DEMO_USER_KEY);
      }
    }
    return null;
  },

  /**
   * Check if Judge Demo Mode is active
   */
  isJudgeDemo: function() {
    return localStorage.getItem(JUDGE_DEMO_KEY) === 'true';
  },

  /**
   * Enter Judge Demo Mode (No credentials required, 100% isolated synthetic environment)
   */
  enterJudgeDemo: function() {
    localStorage.setItem(JUDGE_DEMO_KEY, 'true');
    const demoUser = {
      uid: 'DEMO-JUDGE-001',
      displayName: 'IBM Z Datathon Judge',
      email: 'judge.evaluator@datathon.demo',
      photoURL: 'assets/z-sentinel-logo.png',
      isDemo: true,
      isJudgeDemo: true,
      role: 'Datathon Evaluator'
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  },

  /**
   * Exit Judge Demo Mode and return to login
   */
  exitJudgeDemo: function() {
    localStorage.removeItem(JUDGE_DEMO_KEY);
    localStorage.removeItem(DEMO_USER_KEY);
    
    const isSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/legal/');
    window.location.href = isSubdir ? '../login.html' : 'login.html';
  },

  /**
   * Trigger Firebase Google Sign-In Popup
   */
  signInWithGoogle: async function() {
    if (typeof firebase === 'undefined' || !firebase.auth) {
      throw new Error("Firebase SDK is not loaded. Please verify internet connection.");
    }

    if (!window.ZSentinelConfig.isConfigured()) {
      throw new Error("CONFIG_REQUIRED");
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // Remove any leftover demo state
      localStorage.removeItem(JUDGE_DEMO_KEY);
      localStorage.removeItem(DEMO_USER_KEY);
      return result.user;
    } catch (error) {
      console.error("[Z-Sentinel AI] Google Sign-In error:", error);
      throw error;
    }
  },

  /**
   * Sign out current user (Firebase or Demo)
   */
  signOut: async function() {
    try {
      if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
        await firebase.auth().signOut();
      }
    } catch (e) {
      console.warn("Firebase sign out error:", e);
    }
    localStorage.removeItem(JUDGE_DEMO_KEY);
    localStorage.removeItem(DEMO_USER_KEY);
    
    const isSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/legal/');
    window.location.href = isSubdir ? '../login.html' : 'login.html';
  },

  /**
   * Subscribe to auth changes
   */
  onAuthStateChange: function(callback) {
    if (this.isJudgeDemo()) {
      callback(this.getUser());
      return;
    }

    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          callback({
            uid: user.uid,
            displayName: user.displayName || 'Security Analyst',
            email: user.email || 'analyst@ibmz.org',
            photoURL: user.photoURL || 'assets/z-sentinel-logo.png',
            isDemo: false,
            isJudgeDemo: false,
            role: 'Security Analyst'
          });
        } else {
          callback(this.getUser());
        }
      });
    } else {
      callback(this.getUser());
    }
  }
};
