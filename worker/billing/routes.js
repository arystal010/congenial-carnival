import { publicPlans } from "./plans.js";
import { createCheckoutRequest, verifyWebhook } from "./crypto.js";

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
export async function handleBillingRequest(request, env, path) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS" } });
  if (path === "/api/plans" && request.method === "GET") return json({ plans: publicPlans(), settlement: { token: "USDC", network: "Base" } });
  if (path === "/api/billing/checkout" && request.method === "POST") {
    try { const body = await request.json(); return json({ checkout: createCheckoutRequest(body, env), status: "provider-configuration-required" }); }
    catch (error) { return json({ error: error.message }, 400); }
  }
  if (path === "/api/billing/webhook" && request.method === "POST") {
    if (!(await verifyWebhook(request, env))) return json({ error: "Invalid webhook signature" }, 401);
    return json({ received: true });
  }
  return json({ error: "Billing route not found" }, 404);
}
