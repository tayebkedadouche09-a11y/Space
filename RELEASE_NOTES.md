# NUMI 3.3.0 — Production Truth Edition

## Principle
If it looks successful in the UI, the backend must have evidence. Otherwise the status is NOT_CONFIGURED, PROCESSING, or FAILED.

## Changes
- server/integrations.ts — System Truth
- Admin System Truth tab
- platform.payments public API
- Native provisioning + health check before READY
- Production docs

## Requires credentials for live commerce
DATABASE_URL, OAuth, PUBLIC_APP_URL, payment keys, and for automatic delivery GitHub + Vercel tokens.
