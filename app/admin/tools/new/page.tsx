import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { getCategories } from "@/lib/queries";
import { AdminShell } from "@/components/admin-shell";
import { saveTool } from "@/app/admin/actions";
export default async function NewTool(){
  const user=await getAdminUser();
  if(!user)redirect("/admin/login");
  const cats=await getCategories();
  return <AdminShell email={user.email||"Admin"}>
    <div className="admin-topbar"><div><h1>Add a tool</h1><p>Create an affiliate directory listing with a visible logo.</p></div></div>
    <section className="admin-panel"><form action={saveTool} className="admin-form">
      <div className="field"><label>Tool name *</label><input name="name" required/></div>
      <div className="field"><label>Slug *</label><input name="slug" required placeholder="my-ai-tool" pattern="[a-z0-9-]+"/></div>
      <div className="field field-full"><label>Tagline *</label><input name="tagline" required/></div>
      <div className="field field-full"><label>Description *</label><textarea name="description" required/></div>
      <div className="field"><label>Approved affiliate URL *</label><input name="affiliate_url" type="url" required placeholder="https://..."/></div>
      <div className="field"><label>Official website URL (optional)</label><input name="website_url" type="url" placeholder="https://..."/></div>
      <div className="field"><label>Logo path or HTTPS URL *</label><input name="logo_url" type="text" required placeholder="/logos/tool-slug.png"/><span className="field-help">Use a local file in public/logos or an approved HTTPS image.</span></div>
      <div className="field"><label>Category *</label><select name="category_slug" required>{cats.map(c=><option key={c.id} value={c.slug}>{c.name}</option>)}</select></div>
      <div className="field"><label>Tags (comma separated)</label><input name="tags" placeholder="video, automation, creator"/></div>
      <div className="field"><label>Pricing label</label><input name="pricing" defaultValue="Check current offer"/></div>
      <div className="field"><label>Status</label><select name="status"><option value="draft">Draft</option><option value="published">Published</option></select></div>
      <div className="field"><label><input type="checkbox" name="featured" style={{width:"auto",marginRight:8}}/>Featured tool</label></div>
      <div className="form-actions"><button className="button button-primary">Save tool</button></div>
    </form></section>
  </AdminShell>;
}
