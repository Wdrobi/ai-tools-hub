import { demoTools, categories } from "@/lib/data";
import { hasSupabase, getAdminDb } from "@/lib/supabase";
import type { Tool, Category, BlogPost } from "@/lib/types";
export async function getTools(): Promise<Tool[]> {
  if (hasSupabase) { try { const { data, error } = await getAdminDb().from("tools").select("*").eq("status","published").order("created_at",{ascending:false}); if (!error && data) return data as Tool[]; } catch {} }
  return demoTools;
}
export async function getAllTools(): Promise<Tool[]> {
  if (hasSupabase) { const { data, error } = await getAdminDb().from("tools").select("*").order("created_at",{ascending:false}); if (!error && data) return data as Tool[]; }
  return demoTools;
}
export async function getCategories(): Promise<Category[]> {
  if (hasSupabase) { try { const { data, error } = await getAdminDb().from("categories").select("*").order("name"); if (!error && data?.length) return data as Category[]; } catch {} }
  return categories;
}
export async function getToolBySlug(slug: string): Promise<Tool | undefined> { return (await getTools()).find(t => t.slug === slug); }
export async function getPosts(): Promise<BlogPost[]> {
  if (hasSupabase) { try { const { data, error } = await getAdminDb().from("posts").select("*").eq("status","published").order("published_at",{ascending:false}); if (!error && data) return data as BlogPost[]; } catch {} }
  return [];
}
