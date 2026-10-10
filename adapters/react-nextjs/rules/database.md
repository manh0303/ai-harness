# Database

Keep database access in server-only modules. Expose minimal DTOs rather than raw entities. Make mutations idempotent where retries occur. Define cache keys by authorized user/tenant and plan invalidation after mutations. Reuse existing server data fetching conventions; plain React clients access data through approved APIs.
