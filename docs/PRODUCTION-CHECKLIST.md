# NUMI Production Checklist

Status values: **PASS** · **FAIL** · **BLOCKED** · **NOT_CONFIGURED**

See Admin → System Truth for live integration status.

## Must configure for live selling
1. DATABASE_URL (MySQL)
2. OAuth (OAUTH_SERVER_URL, VITE_APP_ID, JWT_SECRET, OWNER_OPEN_ID)
3. PUBLIC_APP_URL
4. At least one payment provider
5. For automatic delivery: GITHUB_TOKEN, GITHUB_OWNER, VERCEL_TOKEN
