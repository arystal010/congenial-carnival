// Provider-neutral crypto checkout adapter. Default settlement: USDC on Base.
// Secrets must be stored as Worker secrets, never in source control.
export const CRYPTO_DEFAULTS = Object.freeze({ chain: "base", token: "USDC", confirmations: 2 });

export function createCheckoutRequest({ planId, customerId, successUrl, cancelUrl }, env) {
  if (!env.CRYPTO_CHECKOUT_API_KEY) throw new Error("Crypto checkout is not configured");
  if (!planId || !customerId) throw new Error("planId and customerId are required");
  return { planId, customerId, currency: "USDC", network: "base", successUrl, cancelUrl, idempotencyKey: `${customerId}:${planId}:${Date.now()}` };
}

export async function verifyWebhook(request, env) {
  const signature = request.headers.get("x-payment-signature");
  if (!signature || !env.CRYPTO_WEBHOOK_SECRET) return false;
  const raw = await request.clone().text();
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.CRYPTO_WEBHOOK_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const bytes = Uint8Array.from(signature.match(/.{1,2}/g) || [], x => parseInt(x, 16));
  return crypto.subtle.verify("HMAC", key, bytes, new TextEncoder().encode(raw));
}
