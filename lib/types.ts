export type Category = { id: string; name: string; slug: string; description: string; icon: string };
export type PricingPlan = {
  name: string;
  price: string;
  original_price?: string;
  billing_period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
};
export type Tool = {
  id: string; name: string; slug: string; tagline: string; description: string;
  logo_url: string | null; website_url: string; affiliate_url: string | null;
  category_slug: string; tags: string[]; pricing: string; pricing_plans?: PricingPlan[];
  discount_code?: string | null; discount_note?: string | null; featured: boolean;
  status: "published" | "draft"; created_at?: string; updated_at?: string;
};
export type BlogPost = {
  id: string; title: string; slug: string; excerpt: string; content: string;
  status: "published" | "draft"; published_at?: string; created_at?: string;
};
