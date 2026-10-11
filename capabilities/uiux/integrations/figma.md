# Figma integration contract

Figma changes require an AI host with an authorized Figma MCP connection and appropriate file edit permissions. The local `aih` CLI installs only skill/workflow instructions; it has no API key, network access or implicit write privileges.

1. Confirm the destination Figma file and allowed pages/frames with the product owner.
2. Inspect existing component library, variables and approved frames before writing.
3. Create editable native Figma structures when supported by the connected tool; otherwise emit a precise screen specification and note the limitation.
4. Record Figma file/node URLs or IDs and link them to approved screen/requirement IDs.
5. Do not overwrite approved designs or shared libraries unless explicitly authorized.
6. Summarize changed nodes and review evidence; require final human approval.
