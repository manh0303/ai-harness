---
name: harness-react-native-device-permissions
description: Implement device permissions and deep-link flows safely.
---

# device-permissions

## Input
Approved SA/ADR decisions for the affected scope, existing project conventions and actual stack versions. This skill implements accepted design; it does not select infrastructure, dependencies or architecture.
Required device capability, platform support matrix and navigation/access policy.

## Procedure
1. Request the minimum permission at the point of use.
2. Handle denied, revoked and restricted states with accessible recovery UI.
3. Validate deep-link parameters and require backend resource authorization.
4. Exercise cold/warm start links and platform permission transitions on device/simulator.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Permission/navigation changes and per-platform verification.

## Constraints
No store publication, signing changes or claims of native verification based only on JS tests.
