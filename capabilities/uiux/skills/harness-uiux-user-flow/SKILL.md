---
name: harness-uiux-user-flow
description: Derive user journeys, navigation and edge cases from approved product requirements.
---

# harness-uiux-user-flow

## Input
- Requirements inventory with source IDs and approval status.
- User personas and platform constraints.

## Procedure
1. Map each actor's goals, permissions and entry points.
2. Define primary user journeys and navigation decisions.
3. Include empty, loading, error, offline and permission-denied branches where applicable.
4. Connect each step to a requirement ID and flag inferred interactions.
5. Request approval when business rules or the navigation model are undecided.

## Output
- User-flow specification with traceable steps and transitions.
- List of decisions needing review.

## Constraints
- Do not assert unsupported flows as facts.
- Avoid designing beyond the approved product scope.
