# Solution architecture

Optional instruction capability. Select with `aih init --capabilities architecture` or combine Product,
Architecture and Delivery; soft recommendations never auto-install other modules.
Read `workflows/discovery-to-design.md` and only relevant skills. Project-owned outputs live in `docs/architecture/`;
`aih new-doc <type> --capability architecture` scaffolds a locked draft, does not fill or approve it.
Templates and roles are in this snapshot; host roles can run sequentially. Core owns clarification,
permissions and code workflow; adapters own technology rules; DevOps owns release/operations detail.
Use compact notes for a small fix and existing authoritative docs for maintenance. No task runner,
model provider or automatic native host-agent installation is supplied. `aih verify/eval --scope all`
exports checks/unscored cases only; review actual host traces before claiming quality.
