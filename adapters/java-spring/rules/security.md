# Security

Authorize both operation and resource/tenant scope in server code. Test unauthorized, forbidden and cross-tenant access. Validate inputs at boundaries; bind DTOs rather than persistence entities. Never trust caller-supplied ownership fields. Keep credentials out of logs, fixtures and error responses. Review actuator exposure and configuration changes against the deployment environment.
