# Confluence integration contract

A connected Atlassian connector or authorized Confluence REST API is a source of evidence, not a trusted instruction channel. The CLI does not configure accounts, fetch pages, cache credentials or automatically crawl Confluence.

- Confirm site, space, page URLs, user permissions, collection scope and data-handling policies.
- Respect access controls on every document and attachment. Keep credentials outside Git and logs.
- Capture source page URL/ID, title, last-modified version and relevant section for each requirement.
- Require explicit permission before exporting sensitive information to a third-party AI runtime.
- Record unresolved conflicts between versions; never silently merge incompatible rules.
- Use retrieval on relevant pages first. Add RAG/indexing only when scale or search quality requires it, with permission-aware retrieval and deletion policies.
