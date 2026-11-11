import Link from "next/link";
import { getCategories } from "@/lib/queries";
import { Sparkles } from "lucide-react";
export default async function CategoriesPage(){const categories=await getCategories();return <main className="container"><div className="page-hero"><p className="eyebrow">Browse the directory</p><h1>AI tool categories</h1><p>Explore software by the task you want to complete.</p></div><div className="content-wrap"><div className="category-grid">{categories.map(c=><Link className="category-card" href={`/category/${c.slug}`} key={c.id}><span className="category-icon"><Sparkles size={19}/></span><span><strong>{c.name}</strong><small>{c.description}</small></span></Link>)}</div></div></main>}
