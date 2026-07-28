# Arys AI monetization and AI expansion — Phase 1

Defaults selected from current SaaS patterns:
- Free, Pro ($15/mo), and Team ($49/mo)
- USDC settlement on Base
- Provider-neutral checkout boundary so Coinbase Commerce-style providers can be added without coupling the app to a vendor
- Signed webhook verification and server-side entitlements

## Required production configuration

Set `CRYPTO_CHECKOUT_API_KEY` and `CRYPTO_WEBHOOK_SECRET` as Cloudflare Worker secrets. Add a durable user/subscription store (D1 or an external database) before enabling paid access. The checkout route intentionally does not pretend to create a real charge until a provider endpoint and webhook contract are configured.

## Next phases

1. Wire billing routes into `worker/index.js` and persist subscriptions.
2. Add authentication, usage counters, invoices, and a customer portal.
3. Add plan UI to the existing frontend and enforce entitlements in chat/search routes.
4. Add tests, abuse controls, webhook replay protection, and deployment documentation.
