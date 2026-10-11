# Deployment — static vs Cloudflare Workers

- Inspect the repository's package manager, lockfile, actual build command, output mode, server adapter and target runtime; do not assume a pre-installed Wrangler or Cloudflare account.
- Static Astro output usually needs only static hosting/CDN, with no origin backend or database. Browser-local tools do not require Workers.
- For new **Cloudflare** projects, validate the current official recommendation for Workers and adapter setup instead of assuming Pages-specific integration. Existing Pages deployments may remain valid under their compatibility constraints.
- On-demand rendering/APIs require a runtime/adapter matching the Astro version; confirm compatibility for Cloudflare Workers and chosen configuration using upstream docs.
- Configure deploy variables/secrets in the host, not client-visible `PUBLIC_*` values. Confirm environment separation, domain routing, cache behavior and fallback/404 handling.
- Use preview/staging, real production build output and asset smoke checks before any approved deploy. Gate writes and releases via Product/DevOps authorization; never execute `wrangler deploy` or change DNS without approval.
- For future MFE route splitting, define ownership of path, domain, cookies/auth, navigation, asset URLs, SEO/canonicals, monitoring and rollback before introducing separate deployments.
