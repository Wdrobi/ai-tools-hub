import type { PricingPlan, Tool } from "@/lib/types";

const PRICING_MARKER = "__AIT_PRICING_V1__";

type PricingPayload = {
  summary: string;
  plans: PricingPlan[];
  discount_code?: string | null;
  discount_note?: string | null;
};

export function encodePricing(payload: PricingPayload) {
  return `${PRICING_MARKER}${JSON.stringify(payload)}`;
}

export function normalizeToolPricing(tool: Tool): Tool {
  if (!tool.pricing.startsWith(PRICING_MARKER)) return tool;
  try {
    const payload = JSON.parse(tool.pricing.slice(PRICING_MARKER.length)) as PricingPayload;
    return {
      ...tool,
      pricing: payload.summary || "Check current offer",
      pricing_plans: Array.isArray(payload.plans) ? payload.plans : [],
      discount_code: payload.discount_code || null,
      discount_note: payload.discount_note || null,
    };
  } catch {
    return { ...tool, pricing: "Check current offer" };
  }
}
