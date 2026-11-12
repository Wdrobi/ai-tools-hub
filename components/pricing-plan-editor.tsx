"use client";

import { useState } from "react";
import type { PricingPlan } from "@/lib/types";

const emptyPlan = (): PricingPlan => ({
  name: "",
  price: "",
  original_price: "",
  billing_period: "",
  description: "",
  features: [],
  popular: false,
});

export function PricingPlanEditor({
  defaultPlans = [],
  defaultDiscountCode = "",
  defaultDiscountNote = "",
}: {
  defaultPlans?: PricingPlan[];
  defaultDiscountCode?: string;
  defaultDiscountNote?: string;
}) {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans.length ? defaultPlans : [emptyPlan()]);

  function updatePlan(index: number, patch: Partial<PricingPlan>) {
    setPlans(current => current.map((plan, planIndex) => planIndex === index ? { ...plan, ...patch } : plan));
  }

  return <div className="field-full pricing-editor">
    <div className="pricing-editor-heading">
      <div>
        <h2>Pricing packages</h2>
        <p className="field-help">Add every currently available package. Prices can include a currency symbol, such as $49 or ৳5,000.</p>
      </div>
      <button type="button" className="button button-secondary button-small" onClick={() => setPlans(current => [...current, emptyPlan()])}>+ Add package</button>
    </div>
    <input type="hidden" name="pricing_plans" value={JSON.stringify(plans)}/>
    <div className="pricing-editor-list">
      {plans.map((plan, index) => <section className="pricing-editor-card" key={index}>
        <div className="pricing-editor-card-heading">
          <strong>Package {index + 1}</strong>
          {plans.length > 1 && <button type="button" className="text-link pricing-remove" onClick={() => setPlans(current => current.filter((_, planIndex) => planIndex !== index))}>Remove</button>}
        </div>
        <div className="pricing-editor-grid">
          <div className="field"><label>Package name *</label><input value={plan.name} onChange={event => updatePlan(index, { name: event.target.value })} placeholder="Starter" required/></div>
          <div className="field"><label>Current price *</label><input value={plan.price} onChange={event => updatePlan(index, { price: event.target.value })} placeholder="$49" required/></div>
          <div className="field"><label>Original price</label><input value={plan.original_price || ""} onChange={event => updatePlan(index, { original_price: event.target.value })} placeholder="$99"/></div>
          <div className="field"><label>Billing period</label><input value={plan.billing_period || ""} onChange={event => updatePlan(index, { billing_period: event.target.value })} placeholder="per month, per year, or one-time"/></div>
          <div className="field field-full"><label>Short description</label><input value={plan.description || ""} onChange={event => updatePlan(index, { description: event.target.value })} placeholder="Best for individual creators"/></div>
          <div className="field field-full"><label>Included features</label><textarea value={plan.features.join("\n")} onChange={event => updatePlan(index, { features: event.target.value.split("\n").map(item => item.trim()).filter(Boolean) })} placeholder={'One feature per line\n10 projects\nCommercial use'}/></div>
          <label className="pricing-check"><input type="checkbox" checked={Boolean(plan.popular)} onChange={event => updatePlan(index, { popular: event.target.checked })}/> Mark as popular</label>
        </div>
      </section>)}
    </div>
    <div className="pricing-discount-grid">
      <div className="field"><label>Discount code (optional)</label><input name="discount_code" defaultValue={defaultDiscountCode} placeholder="SAVE20"/></div>
      <div className="field"><label>Discount message (optional)</label><input name="discount_note" defaultValue={defaultDiscountNote} placeholder="Use this code for 20% off."/></div>
    </div>
  </div>;
}
