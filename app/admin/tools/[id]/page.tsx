import { redirect,notFound } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { getAllTools,getCategories } from "@/lib/queries";
import { AdminShell } from "@/components/admin-shell";
import { saveTool } from "@/app/admin/actions";
import { PricingPlanEditor } from "@/components/pricing-plan-editor";
export default async function EditTool({params}:{params:Promise<{id:string}>}){
  const user=await getAdminUser();
  if(!user)redirect("/admin/login");
  const {id}=await params;
  const [tools,cats]=await Promise.all([getAllTools(),getCategories()]);
  const t=tools.find(x=>x.id===id);
  if(!t)notFound();
  return <AdminShell email={user.email||"Admin"}>
    <div className="admin-topbar"><div><h1>Edit {t.name}</h1><p>Update its affiliate destination, logo, and listing details.</p></div></div>
    <section className="admin-panel"><form action={saveTool} className="admin-form">
      <input type="hidden" name="id" value={t.id}/>
      <div className="field"><label>Tool name *</label><input name="name" defaultValue={t.name} required/></div>
      <div className="field"><label>Slug *</label><input name="slug" defaultValue={t.slug} required pattern="[a-z0-9-]+"/></div>
      <div className="field field-full"><label>Tagline *</label><input name="tagline" defaultValue={t.tagline} required/></div>
      <div className="field field-full"><label>Description *</label><textarea name="description" defaultValue={t.description} required/></div>
      <div className="field"><label>Approved affiliate URL *</label><input name="affiliate_url" type="url" defaultValue={t.affiliate_url||""} required/></div>
      <div className="field"><label>Official website URL (optional)</label><input name="website_url" type="url" defaultValue={t.website_url===t.affiliate_url?"":t.website_url}/></div>
      <div className="field"><label>Logo path or HTTPS URL *</label><input name="logo_url" type="text" defaultValue={t.logo_url||""} required placeholder="/logos/tool-slug.png"/><span className="field-help">Use a local file in public/logos or an approved HTTPS image.</span></div>
      <div className="field"><label>Category *</label><select name="category_slug" defaultValue={t.category_slug}>{cats.map(c=><option key={c.id} value={c.slug}>{c.name}</option>)}</select></div>
      <div className="field"><label>Tags</label><input name="tags" defaultValue={t.tags.join(", ")}/></div>
      <div className="field"><label>Pricing summary *</label><input name="pricing" defaultValue={t.pricing} required/><span className="field-help">This short text appears on directory cards.</span></div>
      <PricingPlanEditor defaultPlans={t.pricing_plans||[]} defaultDiscountCode={t.discount_code||""} defaultDiscountNote={t.discount_note||""}/>
      <div className="field"><label>Status</label><select name="status" defaultValue={t.status}><option value="draft">Draft</option><option value="published">Published</option></select></div>
      <div className="field"><label><input type="checkbox" name="featured" defaultChecked={t.featured} style={{width:"auto",marginRight:8}}/>Featured tool</label></div>
      <div className="form-actions"><button className="button button-primary">Update tool</button></div>
    </form></section>
  </AdminShell>;
}
