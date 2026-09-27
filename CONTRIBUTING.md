# Contributing to Z-Sentinel AI

Thank you for your interest in contributing to **Z-Sentinel AI** (IBM Z Datathon 2026)!

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Z-Sentinel-AI.git
   cd Z-Sentinel-AI
   ```
2. Set up Python environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Set up Node.js test environment:
   ```bash
   npm install
   npx playwright install --with-deps chromium
   ```

## Branch & Commit Conventions

* **Branch Naming:**
  - `feature/description` (e.g., `feature/isolation-forest-tuning`)
  - `fix/description` (e.g., `fix/mobile-drawer-zIndex`)
  - `docs/description` (e.g., `docs/threat-model-update`)
* **Commit Messages:** Follow conventional commits format:
  - `feat: add burst transaction scenario trigger`
  - `fix: resolve PII boundary regex edge case`
  - `docs: update judge quick start guide`

## Security & Architectural Constraints

When submitting pull requests, ensure adherence to our core architectural constraints:
* **No Frontend Frameworks:** The frontend must remain 100% Vanilla HTML5, CSS3, and modern JavaScript. Do not introduce React, Vue, or Angular.
* **No Client-Side Secrets:** Never introduce server tokens, private keys, or Groq API keys into client-facing HTML or JavaScript.
* **Liquid Glass Constraint:** Use Liquid Glass effects strictly on Topbar, Sidebar, and Footer. Do not turn data analytical cards into glass.
* **Truth in Advertising:** All synthetic data must be explicitly labeled. Do not claim active production deployment without verification.

## Testing & Quality Assurance

Run the test suite prior to submitting a pull request:
```bash
npx playwright test
```
All tests must pass with zero console errors.
