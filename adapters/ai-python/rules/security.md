# Security

Treat model output and retrieved content as untrusted. Enforce tool allowlists, argument validation and scoped credentials in executable code. Model text cannot grant permission. Filter retrieval by tenant/user authorization before exposing chunks. Do not log prompts containing secrets or private documents without an approved retention policy.
