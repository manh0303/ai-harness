# Portable host bridges

## Why
A consumer uses Kiro alongside other tools and has custom/third-party assets across .agents,
.claude and .opencode. Shared workflow/context should remain usable without copying full rules
or carrying company-specific settings into Notth or new projects.

## What changes
Support one chosen AI tool per init/update command, with guides for eight tools. Claude selection enables its existing import
and pointer wrappers. Add managed Copilot/Gemini entry blocks; use native AGENTS discovery for
Codex/Cursor/OpenCode/Windsurf. Preserve installed bridges, user content, native settings and
active project state. Document Windows text pointers, divergent third-party skills and fresh-project setup.

## Scope
No attachment content/imported company setting or new third-party skill is distributed. No host
runtime, permissions, cross-host conversation sync, automatic merge/release or new dependency.
