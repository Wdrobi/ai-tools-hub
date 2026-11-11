# AI Tools Hub

A Vercel-ready AI software directory and affiliate discovery platform built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Features

- Responsive public directory with light/dark theme
- Category pages, tool detail pages, search and filtering
- Server-side affiliate redirect at `/go/[slug]`
- Click event tracking (Supabase)
- Admin login using Supabase Auth + server-side email allowlist
- Admin CRUD for tools, categories, and blog posts
- SEO metadata, sitemap, robots, and affiliate disclosure
- Demo data fallback so the public site can be previewed without Supabase

## 1. Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without Supabase, the public pages use demo records. Admin operations require Supabase.

## 2. Configure Supabase

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Copy Project URL, anon/public key, and service-role key into `.env.local`.
4. Set `ADMIN_EMAILS` to the exact email address(es) allowed to administer the site.
5. In Supabase Authentication, create an admin user with email/password. Disable public signups if they are not needed.
6. Set `NEXT_PUBLIC_SITE_URL` to your local or production origin.

**Security:** `SUPABASE_SERVICE_ROLE_KEY` must never use a `NEXT_PUBLIC_` prefix and must never be imported into client components. It bypasses RLS. The application calls it only from server-side modules after checking the signed-in user's email against `ADMIN_EMAILS`. Use a strong password and enable MFA in Supabase where available.

## 3. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Add all variables from `.env.example` in Vercel Project Settings → Environment Variables.
4. Set `NEXT_PUBLIC_SITE_URL` to your canonical production URL (including `https://`).
5. Deploy.
6. Visit `/api/health` to confirm the app is running and Supabase is configured.

## 4. Add and manage affiliate tools

1. Sign in at `/admin/login` using the allowlisted Supabase admin account.
2. Add a tool using its official URL.
3. Add an affiliate URL only after the vendor approves your affiliate account and provides a tracking link.
4. Keep `status` as `draft` until the listing is reviewed.
5. Publish when the description, product status, pricing notes, and links are verified.

The `/go/[slug]` endpoint sends visitors to the approved affiliate URL when present; otherwise it sends them to the official product URL. Clicks are recorded server-side when Supabase is configured.

## 5. Important before launch

- Demo product records are examples, not endorsements. Verify all official URLs, product availability, features, pricing, affiliate terms, and commercial permissions.
- Replace placeholder contact information and expand the privacy policy to match your analytics, cookies, email tools, and applicable laws.
- Add a cookie/consent solution if required by the jurisdictions and tracking technologies you use.
- Use clear affiliate disclosures near recommendations and calls to action.
- Only use approved affiliate URLs. Do not cloak links in a way that violates a vendor or affiliate-network policy.
- Add rate limiting/bot protection to the redirect endpoint before high-volume launch. Consider deduplication and privacy-safe analytics for click events.
- The initial blog editor stores plain text. Add a vetted Markdown/MDX renderer and sanitization before supporting rich user-authored HTML.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run typecheck` — TypeScript validation

## Demo listings

The starter catalog contains a small set of example listings (Artistly, HumanPal, VideoExpress.ai, ClickSites.ai, and CloneVoiceAI). Their official-domain destinations were checked during project assembly, but product details and commercial terms can change. These records intentionally have **no affiliate URLs**; until you enter an approved affiliate tracking URL, the CTA goes to the vendor's public site. Verify the exact destination and terms again before launch.
