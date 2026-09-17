export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
export const UNAUTHED_ERR_MSG = "UNAUTHORIZED";
export const OAUTH_STATE_COOKIE = "__Host-oauth_state";

export function encodeOAuthState(payload: { redirectUri: string; nonce: string }) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}
