# Test like an end user

The owner requires AI to test through the actual user interface. Existing generic adaptive-verification
already mentions E2E, but lacks a dedicated execution/handoff contract and explicit consistency gate
for matching end-user surface and real dependency coverage.

Add a Core skill/workflow, host-facing adaptive hints and optional schema-1 journey evidence. Reuse
existing host tools/runners, role contracts, report validator, source/write policies and checkpoint flow.
Do not install Playwright or create an LLM/browser runner inside aih. Real target app execution needs
app/tool/account/environment access in the actual consumer host.
