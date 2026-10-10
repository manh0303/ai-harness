# Database

Make transaction boundaries explicit. Use BigDecimal with a domain-defined rounding policy for money and explicit business timezones. Design idempotent retried writes and test concurrent updates. Use the deployed SQL dialect for integration tests. Evolve schemas with expand/contract migrations and deployment ordering. Persist domain change plus outbox event in the same transaction; consumers deduplicate.
