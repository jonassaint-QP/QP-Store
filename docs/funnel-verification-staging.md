# Funnel verification — staged checkout guard

Branch: `fix/funnel-server-pricing-guard`
Status: staged only; not merged or deployed.

## Scope

This patch hardens the checkout handoff without changing NMI credentials, merchant IDs, payload shape, redirect behavior, webhook processing, or production configuration.

The checkout route now resolves each cart item against the server-side `PRODUCTS` catalog. The browser-supplied `price` field is ignored. Stored order items are normalized to catalog identity, SKU, name, quantity, and catalog unit price. Invalid product IDs and quantities fail with HTTP 400 before database persistence.

The pending-order write must return an order ID before the NMI request is constructed. If it does not, the route returns HTTP 400 and does not make a gateway call.

## Acceptance checks

A forged client price of `0.01` must still produce the catalog total. A forged client price of `99999.99` must still produce the catalog total. An invalid product ID or quantity must return HTTP 400 with no NMI call. A pending-order insert that returns no ID must return HTTP 400 with no NMI call. Existing NMI Step 1 and webhook behavior remains unchanged.

## Remaining gates

This branch requires local typecheck/build and test-mode checkout verification before review. Merging or deploying this revenue-lane patch remains a Joshua approval gate. The subscription cancellation flow remains separately blocked on the local PostgreSQL 16 sandbox initialization.
