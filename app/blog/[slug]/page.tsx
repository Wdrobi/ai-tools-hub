import { notFound } from "next/navigation";
import { getPosts } from "@/lib/queries";
export default async function BlogPost({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=(await getPosts()).find(x=>x.slug===slug);if(!p)notFound();return <main className="container"><div className="page-hero"><p className="eyebrow">AI Tools Hub editorial</p><h1>{p.title}</h1><p>{p.excerpt}</p></div><article className="content-wrap prose">{p.content.split(/\n\s*\n/).map((para,i)=><p key={i}>{para}</p>)}</article></main>}
