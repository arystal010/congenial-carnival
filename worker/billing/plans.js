// Product plans and entitlement rules. Prices are USD; checkout may settle in USDC.
export const PLANS = Object.freeze({
  free: { id: "free", name: "Free", monthlyUsd: 0, dailyMessages: 20, monthlyTokens: 100000, webSearches: 10, features: ["basic-chat", "limited-search"] },
  pro: { id: "pro", name: "Pro", monthlyUsd: 15, dailyMessages: 500, monthlyTokens: 5000000, webSearches: 500, features: ["basic-chat", "web-search", "priority-models", "exports"] },
  team: { id: "team", name: "Team", monthlyUsd: 49, dailyMessages: 3000, monthlyTokens: 25000000, webSearches: 3000, features: ["basic-chat", "web-search", "priority-models", "exports", "shared-workspaces", "admin-analytics"] },
});

export function getPlan(id = "free") { return PLANS[id] || PLANS.free; }
export function hasFeature(planId, feature) { return getPlan(planId).features.includes(feature); }
export function canUse(planId, metric, used = 0) {
  const plan = getPlan(planId);
  const limit = plan[metric];
  return typeof limit !== "number" || used < limit;
}
export function publicPlans() { return Object.values(PLANS).map(({ id, name, monthlyUsd, dailyMessages, monthlyTokens, webSearches, features }) => ({ id, name, monthlyUsd, dailyMessages, monthlyTokens, webSearches, features })); }
