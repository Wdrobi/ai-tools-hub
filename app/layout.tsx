import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), title: { default:"AI Tools Hub — Discover AI Tools for Every Need", template:"%s | AI Tools Hub" }, description:"Discover, compare, and explore useful AI tools for writing, image creation, video, coding, marketing, and productivity.", openGraph:{ title:"AI Tools Hub", description:"Discover useful AI tools for every need.", type:"website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body><ThemeProvider><Header/>{children}<Footer/></ThemeProvider></body></html>; }
