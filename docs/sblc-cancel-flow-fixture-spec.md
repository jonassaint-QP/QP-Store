# SBLC Cancel-Flow Fixture Spec (Sandbox-Only)

Status: STAGED for build/verify.
Owner: Eva (spec), Joshua (verify + run).

## Purpose
Prove that canceling a membership at /membership/manage (a) changes the subscription row status to canceled, (b) prevents the next scheduled charge, and (c) keeps the no-prorated-refund posture accurate. Runs entirely in a sandbox database. No real charge, no real customer, no production row.

## Governing rule
Operational checks on /membership/manage must use only test subscriptions or sandbox records; never live customer accounts or real charges. If no fixture exists, mark blocked rather than touching production billing.

## Fixture record (matches src/db/schema.ts subscriptions table)
- email: sblc-fixture@queerpathways.test (.test TLD is reserved/unroutable)
- tier: 'standard'
- productLabel: 'Sovereign Body Lube Club — Standard (Test Fixture)'
- sku: 'SBLC-FIXTURE-001'
- pricePerShipment: '0.00'
- billingDay: 1
- intervalMonths: 1
- status: 'active'
- founding: false
- nextChargeDate: 2027-01-01T00:00:00Z (far future)
- shippingAddress: null
- nmiVaultId: null (no payment method, no gateway call possible)
- lastOrderId: null

## Seed script
scripts/seed-test-subscription.ts
Guards: refuses unless ALLOW_TEST_SEED=true AND DATABASE_URL host is in sandbox allowlist (localhost, 127.0.0.1, sandbox, staging, test). Inserts the fixture row via drizzle and prints the new id.

## Test sequence
1. Point DATABASE_URL at the sandbox DB; run the seed script; note fixture id.
2. Confirm row is active: select id, status, next_charge_date where email = fixture.
3. POST /api/membership/manage with {"email":"sblc-fixture@queerpathways.test","subscriptionId":<id>,"action":"cancel"} → expect 200, status canceled, message 'Your subscription is canceled. No future charges or shipments will occur.'
4. Re-query row: status = 'canceled', next_charge_date still 2027-01-01 (frozen).
5. Run classifyForCharge('canceled', nextChargeDate, now) → expect { kind: 'not-chargeable', reason: 'canceled' }.
6. Scheduler dry-run (netlify/functions/sblc-billing.ts) → fixture is not due; no charge attempted.
7. Cleanup: delete row where email = fixture.

## Acceptance criteria
1. POST cancel returns 200 with status canceled and the exact no-future-charges message.
2. Row status = canceled; nextChargeDate unchanged from seed.
3. classifyForCharge returns not-chargeable reason canceled.
4. Scheduler dry-run reports no charge for the fixture.
5. No NMI transaction attempted (no nmiVaultId; no gateway call).
6. Production subscriptions table untouched; fixture exists only in sandbox.
