import type { Metadata } from "next";
import { getCategories, getTools } from "@/lib/queries";
import { SearchTools } from "@/components/search-tools";
export const metadata: Metadata = { title:"Explore AI Tools", description:"Search and filter AI tools by category and use case." };
export default async function ToolsPage({searchParams}:{searchParams:Promise<{q?:string}>}) { const [{q=""},tools,categories]=await Promise.all([searchParams,getTools(),getCategories()]); return <main className="container"><div className="page-hero"><p className="eyebrow">The directory</p><h1>Explore AI tools</h1><p>Search a growing directory of AI software. Compare package prices and review the current offer terms before purchasing.</p></div><div className="content-wrap"><SearchTools tools={tools} categories={categories} initialQuery={q}/></div></main>; }
