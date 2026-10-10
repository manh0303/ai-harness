---
name: harness-java-spring-database-migration
description: Evolve a Spring application schema across compatible deployments.
---

# database-migration

## Input
Current schema, database dialect, migration tool and deployment/rollback constraints.

## Procedure
1. Plan an additive phase compatible with both old and new application versions.
2. Separate backfill from destructive cleanup and bound batch size and lock duration.
3. Test migration on representative schema/data and verify application compatibility.
4. Document rollback or roll-forward recovery before removing legacy columns.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Versioned migration, compatibility matrix and recovery evidence.

## Constraints
Do not execute production migrations or assume destructive DDL is reversible.
