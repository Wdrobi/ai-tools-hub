import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="AI Tools Hub home">
          <span className="brand-mark"><Sparkles size={19}/></span>
          <span>AI Tools <b>Hub</b></span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link href="/tools">Explore tools</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/blog">Guides</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/tools" className="search-link" aria-label="Search AI tools"><Search size={16}/> <span>Find tools</span></Link>
          <ThemeToggle/>
          <Link href="/tools" className="button button-small button-primary nav-cta">Browse tools <ArrowRight size={14}/></Link>
        </div>
      </div>
    </header>
  );
}
