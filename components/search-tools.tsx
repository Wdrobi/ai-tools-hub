"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, Tool } from "@/lib/types";
import { ToolCard } from "@/components/tool-card";

export function SearchTools({ tools, categories, initialQuery = "" }: { tools: Tool[]; categories: Category[]; initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const normalizedQuery = q.trim().toLowerCase();
  const filtered = useMemo(() => tools.filter((tool) =>
    (category === "all" || tool.category_slug === category) &&
    `${tool.name} ${tool.tagline} ${tool.description} ${tool.tags.join(" ")}`.toLowerCase().includes(normalizedQuery)
  ), [tools, normalizedQuery, category]);

  return <>
    <div className="filter-bar">
      <div className="search-box"><Search size={18}/><input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search AI tools, categories, or use cases..." aria-label="Search AI tools"/>{q && <button onClick={() => setQ("")} aria-label="Clear search"><X size={16}/></button>}</div>
      <div className="select-wrap"><SlidersHorizontal size={16}/><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter category"><option value="all">All categories</option>{categories.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></div>
    </div>
    <p className="result-count">Showing <b>{filtered.length}</b> of {tools.length} tools</p>
    {filtered.length ? <div className="tool-grid">{filtered.map((tool) => <ToolCard key={tool.id} tool={tool}/>)}</div> : <div className="empty-state"><Search size={28}/><h3>{tools.length ? "No matching tools" : "New listings are coming soon"}</h3><p>{tools.length ? "Try a different search term or category." : "We are reviewing tools before adding them to the directory."}</p>{(q || category !== "all") && <button className="button button-secondary" onClick={() => { setQ(""); setCategory("all"); }}>Clear filters</button>}</div>}
  </>;
}
