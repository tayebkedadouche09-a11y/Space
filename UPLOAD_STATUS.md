# NUMI GitHub upload status

**Repo:** https://github.com/tayebkedadouche09-a11y/Space  
**Branch:** `main`  
**Product version:** 3.3.0 Production Truth

## On GitHub now (verified)

Core production modules (match the ZIP for these paths):

- `server/integrations.ts` — System Truth
- `server/provisioning.ts` — honest native + health
- `server/github.ts` — real private customer repos
- `server/vercel.ts` — real project + deploy poll
- `server/os/health.ts`, `stateMachine.ts`, `automation.ts`, `featureFlags.ts`
- `client/src/App.tsx`
- `docs/*` production docs
- `VERSION.md`, `RELEASE_NOTES.md`, `.env.example`, CI

## Not fully mirrored yet via API

The complete tree is **~164 source files** (+ assets). GitHub currently holds the **Production Truth core** (~35 paths).

Remaining large modules (Admin UI, full `db.ts`, UI kit, etc.) are in:

`NUMI-PRODUCTION-TRUTH-3.3.0.zip`

## Force full parity (recommended)

```bash
unzip NUMI-PRODUCTION-TRUTH-3.3.0.zip
cd numi-final
git init
git remote add origin https://github.com/tayebkedadouche09-a11y/Space.git
git fetch origin
git checkout -B main
git add -A
git commit -m "feat: NUMI 3.3.0 complete source tree"
git push -u origin main --force
```

After that command, ZIP and GitHub match 1:1 (excluding node_modules / pnpm-lock).

## Reality rule

No fake CONNECTED / READY / PAID without evidence.
