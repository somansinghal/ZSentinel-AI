import { test, expect } from '@playwright/test';

test.describe('12 - REST API Endpoints & Health Verification', () => {
  test('GET /api/health should return HEALTHY status and system telemetry', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('HEALTHY');
    expect(body.system).toContain('Z-Sentinel AI');
    expect(body.event_adapter).toContain('Simulated');
  });

  test('POST /api/analyze should evaluate transaction risk and return explanation', async ({ request }) => {
    const sampleTx = {
      transactionId: 'TX-TEST-001',
      userId: 'USER-999',
      amount: 125000.0,
      timestamp: new Date().toISOString(),
      location: 'Zurich, Switzerland',
      device: 'DEV-UNKNOWN-99',
      status: 'PENDING'
    };

    const res = await request.post('/api/analyze', { data: sampleTx });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.risk_score).toBeGreaterThan(50);
    expect(body.action).toBeDefined();
    expect(body.reasons).toBeInstanceOf(Array);
  });

  test('POST /api/privacy should redact PAN and sensitive PII', async ({ request }) => {
    const payload = {
      text: 'Wire payment to card 4929-1102-9481-3210 and ssn 987-65-4321 for user alice@bank.com'
    };

    const res = await request.post('/api/privacy', { data: payload });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.totalRedactions).toBeGreaterThan(0);
    expect(body.sanitizedText).toContain('************3210');
  });

  test('GET /api/threats should return array of active threats', async ({ request }) => {
    const res = await request.get('/api/threats');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /api/ibmz/events should return synthetic mainframe stream records', async ({ request }) => {
    const res = await request.get('/api/ibmz/events');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });
});
