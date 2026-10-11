# Security & privacy — public web utilities

- Browser code is public; never embed API keys, private tokens, service credentials, signing secrets or user-private data in Astro frontmatter emitted to HTML or any client-side code.
- Client-only utilities should process user data locally where feasible; avoid uploading files, URLs and personal content if the task does not require it. Make file size limits, cleanup and user-visible privacy behavior explicit.
- If a Worker/server endpoint fetches arbitrary user-supplied URLs, treat SSRF as a top risk: allowlist supported hosts/protocols, block private/link-local/metadata destinations and redirects to them, cap redirects/response size/time, validate content type and enforce quotas/rate limits. Where robust network filtering is unavailable, don't offer arbitrary URL proxying.
- Distinguish truly public source content from authenticated/private social content. Do not bypass platform access controls, CAPTCHAs or privacy settings, or imply anonymous retrieval works for restricted content.
- Server APIs must validate input and enforce authorization on the server, not just hide buttons. Bound compute/time/memory; handle abuse, scraping and unexpected upstream errors.
- Guard XSS via Astro default escaping, safe DOM sinks, content policy appropriate to the deployment, dependency reviews and controlled third-party scripts.
- Obtain permission before indexing or displaying third-party media, storing user content or deploying to production. Avoid logging sensitive full URLs/query tokens.
