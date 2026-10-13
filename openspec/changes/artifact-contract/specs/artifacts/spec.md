## ADDED Requirements
### Requirement: Project-owned input and output contracts
The installer SHALL seed absent artifact/integration contracts, preserve custom bytes and reject invalid declarations before persistent writes.
#### Scenario: Existing configured project
- WHEN a reviewed update runs with valid custom contracts
- THEN their bytes and source docs remain unchanged and only managed payload is upgraded.
#### Scenario: Invalid config
- WHEN a declaration contains a dangling connection, cyclic output dependency, unsafe path or credential field
- THEN installation fails without writing the snapshot or leaking malformed JSON values.

### Requirement: Storage-directed document drafts
The CLI SHALL use a declared capability docs directory or return an external host handoff without publishing or silently creating another master.
#### Scenario: Local route
- WHEN Product output is declared at docs/requirements and new-doc prd-lite runs
- THEN the draft is created there and existing documents are never overwritten.
#### Scenario: External route
- WHEN the output is an external page URL with a declared host connection
- THEN the actual template/destination and unexecuted handoff are returned without network calls or local fallback copies.

### Requirement: Scoped source policies and host boundaries
Connections SHALL be dynamic aliases with unverified availability; declarations SHALL NOT grant runtime permissions.
#### Scenario: Existing read-only source
- WHEN a requested behavior affects a read-only Confluence input
- THEN the host prepares a separate proposal, records the canonical source revision and reports unavailable publication instead of editing the source.

### Requirement: Spec-driven artifact maintenance
Configured output contracts SHALL require reviewed impact coverage before implementation and completed evidence before review.
#### Scenario: Pending output maintenance
- WHEN review readiness has pending docs/UI/spec maintenance
- THEN it reports blocked even when application test evidence is recorded.
#### Scenario: Legacy project
- WHEN artifact contracts are absent or unconfigured
- THEN existing document defaults and readiness remain compatible without mandatory new documentation.
