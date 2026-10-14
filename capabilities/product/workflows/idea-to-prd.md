# Idea → documented product specification

## Trigger
User submits an idea/product problem, target users and expected platform. Runtime requires authorized input context; no connector is assumed.

## Workflow
1. **Intake:** create `product-brief.md` and `source-register.md`; classify user claims as direct input and all AI elaboration as proposals.
2. **Business discovery:** `harness-product-knowledge-analysis` and `harness-product-business-analysis`; discover actors, constraints, AS-IS/TO-BE and open questions. If evidence is insufficient, create a decision request rather than fabricate.
3. **BRD gate:** draft with `harness-product-brd-generation` and request business owner review. Unapproved items remain explicitly provisional.
4. **PRD:** use `harness-product-prd-generation` to define MVP, non-goals, metrics and risks, grounded in business requirements.
5. **Backlog:** run user-stories and acceptance-criteria skills; prioritize using explicit assumptions only.
6. **Traceability:** map source → BR/FR/NFR → PRD → epic/story → AC; mark downstream screens/changes `pending`.
7. **Independent QA:** run `harness-product-document-review` to find gaps and conflicting assertions.
8. **Human approval:** request named BA/PM/PO approval; record sign-off externally. Do not auto-approve or start UI/UX/development until required scope is accepted.

## Outputs
Store project-owned generated drafts under `docs/product/`: product-brief, source-register, business-context, brd, business-rules, prd, backlog, acceptance-criteria, traceability, review-report and decision-log as applicable. Templates are examples, not already populated artifacts.

## Integration boundary
After approval, UI/UX consumes PRD + requirement IDs + stories/AC; OpenSpec consumes approved stories and rules. This workflow does not invoke LLM, Jira, Confluence, Figma or git actions by itself.

## Contract stages

| Stage ID | Owner |
| --- | --- |
| `intake` | product:business-analyst |
| `business-discovery` | product:business-analyst |
| `brd-gate` | product:business-analyst |
| `prd` | product:product-manager |
| `backlog` | product:product-owner |
| `traceability` | product:business-analyst |
| `independent-qa` | product:requirements-reviewer |
| `human-approval` | human:product-owner |

Machine contract: idea-to-prd.workflow.json. `ready --workflow idea-to-prd` uses the installed Product contract and per-change approvals; output checks require the declared docs/product files. Configure a different driver contract for externally stored artifacts. Sign-off remains external evidence, not identity verification.
