# GitLab integration

Copy/adapt harness-ci.yml into the consumer's existing pipeline only after reviewing stage and workflow
rules. The framework does not overwrite .gitlab-ci.yml. HARNESS_ROOT must point to a trusted checkout
pinned to a commit/tag; provide it through your organization's approved checkout mechanism.
Do not disable an existing security gate to make this example fit. Configure protected branches and
merge approvals in GitLab. Keep tokens masked, scoped and unavailable to untrusted fork pipelines.
Use the GitHub PR template's problem/spec/evidence/rollback structure for merge requests too.
For multi-repo changes link sibling MRs and declare dependency order; archive the spec after all merge.
