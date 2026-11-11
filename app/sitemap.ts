import type { MetadataRoute } from "next";
import { getTools,getCategories,getPosts } from "@/lib/queries";
import { siteUrl } from "@/lib/utils";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const [tools,cats,posts]=await Promise.all([getTools(),getCategories(),getPosts()]);return [{url:siteUrl("/"),changeFrequency:"daily",priority:1},{url:siteUrl("/tools"),changeFrequency:"daily",priority:.9},{url:siteUrl("/categories"),changeFrequency:"weekly",priority:.8},...cats.map(c=>({url:siteUrl(`/category/${c.slug}`),changeFrequency:"weekly" as const,priority:.7})),...tools.map(t=>({url:siteUrl(`/tools/${t.slug}`),changeFrequency:"weekly" as const,priority:.8})),...posts.map(p=>({url:siteUrl(`/blog/${p.slug}`),changeFrequency:"monthly" as const,priority:.6}))];}
