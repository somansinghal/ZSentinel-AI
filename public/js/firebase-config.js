/**
 * Z-SENTINEL AI — FIREBASE CONFIGURATION
 * IBM Z Datathon 2026
 * 
 * Instructions:
 * Replace the values in defaultFirebaseConfig with your Firebase Project Configuration
 * from Firebase Console (Project Settings > General > Your apps > Web app).
 */

const defaultFirebaseConfig = {
  apiKey: "AIzaSyYOUR_FREE_FIREBASE_API_KEY_HERE",
  authDomain: "z-sentinel-ai-ibmz.firebaseapp.com",
  projectId: "z-sentinel-ai-ibmz",
  storageBucket: "z-sentinel-ai-ibmz.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Check if user set custom config in localStorage
function getActiveFirebaseConfig() {
  const custom = localStorage.getItem('zsentinel_firebase_config');
  if (custom) {
    try {
      return JSON.parse(custom);
    } catch (e) {
      console.warn("Failed to parse custom Firebase config from localStorage", e);
    }
  }
  return defaultFirebaseConfig;
}

let firebaseApp = null;
let firebaseAuth = null;
let isConfigValid = false;

// Initialize Firebase App
(function initializeFirebase() {
  const config = getActiveFirebaseConfig();
  
  // Basic validation that user replaced placeholder
  if (config.apiKey && !config.apiKey.includes("YOUR_FREE_FIREBASE") && config.projectId !== "z-sentinel-ai-ibmz") {
    isConfigValid = true;
  }

  if (typeof firebase !== 'undefined') {
    try {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(config);
      } else {
        firebaseApp = firebase.app();
      }
      firebaseAuth = firebase.auth();
      console.log("%c[Z-Sentinel AI] Firebase Initialized successfully.", "color: #00f0ff; font-weight: bold;");
    } catch (err) {
      console.warn("[Z-Sentinel AI] Firebase initialization notice:", err.message);
    }
  } else {
    console.warn("[Z-Sentinel AI] Firebase CDN scripts not loaded yet.");
  }
})();

// Helper to check configuration state
window.ZSentinelConfig = {
  getConfig: getActiveFirebaseConfig,
  saveConfig: function(newConfig) {
    localStorage.setItem('zsentinel_firebase_config', JSON.stringify(newConfig));
    location.reload();
  },
  resetConfig: function() {
    localStorage.removeItem('zsentinel_firebase_config');
    location.reload();
  },
  isConfigured: function() {
    const cfg = getActiveFirebaseConfig();
    return !!(cfg.apiKey && !cfg.apiKey.includes("YOUR_FREE_FIREBASE") && cfg.projectId !== "z-sentinel-ai-ibmz");
  }
};
