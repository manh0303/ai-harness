---
name: harness-java-spring-spring-api
description: Implement a Spring API with resource-scoped authorization and stable contracts.
---

# spring-api

## Input
Approved endpoint contract, actual Spring version, existing controller/service patterns and access policy.

## Procedure
1. Map request, validation, success and error contracts to the spec.
2. Implement authorization for both action and resource ownership; keep transaction boundaries in the application layer.
3. Cover valid, invalid, unauthenticated, forbidden and cross-tenant requests using the existing JUnit stack.
4. Run the reviewed wrapper checks and report exact evidence plus blocked checks.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Endpoint changes, contract tests and requirement-to-test evidence.

## Constraints
Do not introduce framework upgrades, weaken authorization or invent domain validation rules.
