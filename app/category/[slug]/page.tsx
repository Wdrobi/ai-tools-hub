import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories,getTools } from "@/lib/queries";
import { ToolCard } from "@/components/tool-card";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=(await getCategories()).find(x=>x.slug===slug);return {title:c?.name||"Category",description:c?.description};}
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const [cats,tools]=await Promise.all([getCategories(),getTools()]);const category=cats.find(c=>c.slug===slug);if(!category)notFound();const matches=tools.filter(t=>t.category_slug===slug);return <main className="container"><div className="page-hero"><p className="eyebrow">Category</p><h1>{category.name}</h1><p>{category.description}</p></div><div className="content-wrap">{matches.length?<div className="tool-grid">{matches.map(t=><ToolCard key={t.id} tool={t}/>)}</div>:<div className="empty-state">No published tools in this category yet.</div>}</div></main>}
