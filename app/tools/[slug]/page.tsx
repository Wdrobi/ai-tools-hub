/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, TicketPercent } from "lucide-react";
import { getToolBySlug,getCategories } from "@/lib/queries";
import { initials } from "@/lib/utils";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const tool=await getToolBySlug(slug);
  return {title:tool?.name||"AI Tool",description:tool?.tagline};
}

export default async function ToolDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [tool,categories]=await Promise.all([getToolBySlug(slug),getCategories()]);
  if(!tool)notFound();
  const category=categories.find(item=>item.slug===tool.category_slug);
  const plans=Array.isArray(tool.pricing_plans)?tool.pricing_plans:[];

  return <main className="container">
    <div className="page-hero"><Link href="/tools" className="text-link"><ArrowLeft size={14}/> Back to directory</Link></div>
    <div className="detail-layout">
      <article className="detail-main">
        <div className="detail-title">
          <div className="tool-logo">{tool.logo_url?<img src={tool.logo_url} alt={`${tool.name} logo`}/>:initials(tool.name)}</div>
          <div><p className="eyebrow">{category?.name||"AI software"}</p><h1>{tool.name}</h1><p className="muted" style={{margin:0}}>{tool.tagline}</p></div>
        </div>
        <h2>About {tool.name}</h2>
        <p>{tool.description}</p>

        <section className="pricing-section" aria-labelledby="pricing-heading">
          <div className="pricing-section-heading">
            <div><p className="eyebrow">Clear package pricing</p><h2 id="pricing-heading">Plans and prices</h2></div>
            <span className="pricing-updated">Check offer page for current terms</span>
          </div>
          {plans.length ? <div className={`pricing-plan-grid ${plans.length===1?"pricing-plan-grid-single":""}`}>
            {plans.map((plan,index)=><article className={`pricing-plan ${plan.popular?"pricing-plan-popular":""}`} key={`${plan.name}-${index}`}>
              {plan.popular&&<span className="pricing-popular">Popular</span>}
              <h3>{plan.name}</h3>
              {plan.description&&<p className="pricing-plan-description">{plan.description}</p>}
              <div className="pricing-price-row">
                {plan.original_price&&<span className="pricing-original">{plan.original_price}</span>}
                <strong>{plan.price}</strong>
                {plan.billing_period&&<span>{plan.billing_period}</span>}
              </div>
              {plan.features.length>0&&<ul className="pricing-features">{plan.features.map(feature=><li key={feature}><Check size={15}/><span>{feature}</span></li>)}</ul>}
              <a className="button button-secondary pricing-plan-cta" href={`/go/${tool.slug}`} rel="nofollow sponsored">View offer <ArrowUpRight size={15}/></a>
            </article>)}
          </div>:<div className="pricing-fallback"><strong>{tool.pricing}</strong><span>See the current offer for complete package details.</span></div>}
          {tool.discount_code&&<div className="discount-banner"><TicketPercent size={22}/><div><span>Discount code</span><strong>{tool.discount_code}</strong>{tool.discount_note&&<p>{tool.discount_note}</p>}</div></div>}
          <p className="pricing-disclaimer">Prices and discounts may change. Confirm the final amount, billing terms, taxes, and refund policy on the offer page before purchasing.</p>
        </section>

        <h2>Who may find it useful?</h2>
        <p>Review the product against your own workflow, budget, required integrations, and commercial-use needs. The best choice depends on your use case and the vendor's current plan terms.</p>
        <h2>What to check before purchasing</h2>
        <ul>{["Current feature set and product availability","Plan limits, subscription terms, and refund policy","Commercial-use rights and content ownership","Supported integrations, languages, and export formats","Privacy, data retention, and security documentation"].map(item=><li key={item} style={{marginBottom:9,color:"var(--muted)"}}><CheckCircle2 size={15} style={{display:"inline",marginRight:8,color:"var(--accent)"}}/>{item}</li>)}</ul>
        <h2>Tags</h2>
        <div className="tag-row">{tool.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div>
      </article>
      <aside className="detail-aside">
        <p className="eyebrow">Explore this product</p>
        <h3 style={{margin:"0 0 8px"}}>View {tool.name}</h3>
        <p className="muted" style={{fontSize:13,lineHeight:1.6}}>Review current plans, demos, and product details before purchasing.</p>
        <a className="button button-primary" href={`/go/${tool.slug}`} rel="nofollow sponsored">View current offer <ArrowUpRight size={16}/></a>
        {tool.discount_code&&<div className="aside-coupon"><span>Use discount code</span><strong>{tool.discount_code}</strong></div>}
        <p className="notice">Affiliate disclosure: We may earn a commission if you purchase through qualifying links, at no additional cost to you. This does not determine our editorial assessments.</p>
        <hr style={{border:0,borderTop:"1px solid var(--line)",margin:"20px 0"}}/>
        <p className="muted text-xs">Pricing: {tool.pricing}</p>
        <p className="muted text-xs">Category: {category?.name||"Other"}</p>
      </aside>
    </div>
  </main>;
}
