import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
export function Header() { return <header className="site-header"><div className="container nav-wrap"><Link href="/" className="brand"><span className="brand-mark"><Sparkles size={19}/></span><span>AI Tools <b>Hub</b></span></Link><nav className="main-nav"><Link href="/tools">Explore tools</Link><Link href="/categories">Categories</Link><Link href="/blog">Blog</Link></nav><div className="nav-actions"><Link href="/tools" className="search-link"><Search size={16}/> <span>Find tools</span></Link><ThemeToggle/><Link href="/admin" className="button button-small button-primary">Admin</Link></div></div></header>; }
