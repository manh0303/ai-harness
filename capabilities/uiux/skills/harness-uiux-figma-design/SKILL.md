---
name: harness-uiux-figma-design
description: Use an authorized Figma connection to create editable frames from approved requirements and UI specifications.
---

# harness-uiux-figma-design

## Input
- Approved screen specifications and design tokens.
- Explicit target Figma file, write access and approval to modify it.

## Procedure
1. Confirm Figma MCP availability, accessible target file and requested operation permissions.
2. Find reusable components, variables, styles and previously approved frames.
3. Build editable frames with auto layout, semantic naming and existing component instances.
4. Create the required variants, empty/error/loading states and responsive layouts.
5. Capture file and node identifiers in a project-owned manifest; review screenshots and iterate.

## Output
- Editable Figma frames and a screen-ID-to-Figma-node mapping.
- Summary of changes, gaps and screenshots for reviewer confirmation.

## Constraints
- Do not claim that Figma objects were created without a successful connected tool response.
- Never overwrite approved frames or change shared libraries without explicit approval.
- A local CLI only installs instructions; it does not contact Figma or supply credentials.
