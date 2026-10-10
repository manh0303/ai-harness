# Security

Use platform secure credential storage; ordinary asynchronous key-value storage is not a token vault. Validate deep links and enforce authorization on the backend. Minimize permission requests and define denied/revoked behavior. Never log tokens, personal identifiers or sensitive push payloads. Do not alter signing or store credentials.
