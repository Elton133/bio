// Public address used for share links, the sitemap and robots.txt.
// Set NEXT_PUBLIC_SITE_URL once a custom domain is live; Vercel's production URL is used until then.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
