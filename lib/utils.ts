import { clsx, type ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]) { return clsx(inputs); }
export function siteUrl(path = "") { return `${(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/,"")}${path}`; }
export function initials(name: string) { return name.split(/\s+/).slice(0,2).map(s=>s[0]).join("").toUpperCase(); }
