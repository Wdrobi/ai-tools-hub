export type Category = { id: string; name: string; slug: string; description: string; icon: string };
export type Tool = {
  id: string; name: string; slug: string; tagline: string; description: string;
  logo_url: string | null; website_url: string; affiliate_url: string | null;
  category_slug: string; tags: string[]; pricing: string; featured: boolean;
  status: "published" | "draft"; created_at?: string; updated_at?: string;
};
export type BlogPost = {
  id: string; title: string; slug: string; excerpt: string; content: string;
  status: "published" | "draft"; published_at?: string; created_at?: string;
};
