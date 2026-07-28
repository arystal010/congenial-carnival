export async function loadPlans() {
  const response = await fetch(`${window.ArysConfig?.apiBase || ""}/api/plans`);
  if (!response.ok) throw new Error("Plans unavailable");
  return response.json();
}
export function renderPlans(container, plans, onChoose) {
  container.innerHTML = plans.map(plan => `<article class="plan-card"><h3>${plan.name}</h3><strong>${plan.monthlyUsd ? `$${plan.monthlyUsd}/month` : "Free"}</strong><p>${plan.dailyMessages.toLocaleString()} messages/day</p><button data-plan="${plan.id}">${plan.id === "free" ? "Start free" : "Choose plan"}</button></article>`).join("");
  container.querySelectorAll("button[data-plan]").forEach(button => button.addEventListener("click", () => onChoose(button.dataset.plan)));
}
