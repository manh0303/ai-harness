# Host portability live checks

Status: **NOT_RUN**. CLI/package tests verify generated files, not host behavior. Use a disposable
consumer and each actual supported tool/version/account; retain redacted session traces.

| Scenario | Required observations |
| --- | --- |
| Kiro → Claude → OpenCode | Each reads AGENTS and the same canonical skill; report actual current task/adapter/decision, not chat history assumptions |
| Existing Claude instructions | Native import appears in /context; team text/settings remain; skill invokes full canonical body |
| Copilot/Gemini bridge | Native entry loads; agent actually reads applicable AGENTS; Gemini memory shows imported content |
| Cursor/Windsurf | Root/scoped AGENTS apply; explicitly read relevant skill if discovery unavailable |
| Windows clone/ZIP | A path-only text file is identified as unresolved pointer, not claimed to be loaded as a skill; compare/repair without deleting custom assets |
| New project | Facts/task/cache from prior project are not reused; start.json absent until real task; only missing decisions asked |

Record host/version, surface, source revision, installed lock, relevant native settings, expected/observed,
trace paths and PASS/FAIL/BLOCKED. Verify outcomes from actual file reads and host context UI;
agent self-report alone is insufficient. No automatic provider calls or compliance score is supplied.
