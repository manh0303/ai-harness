# Engineering depth

### Requirement: Proportional coding discipline
#### Scenario: Diagnosis or safe refactor
WHEN a defect or refactor request is received
THEN the host respects diagnosis-only scope, investigates falsifiable causes, preserves observable contracts and records actual regression evidence without deleting user code to enforce TDD.

### Requirement: Selective architecture and TechSpec
#### Scenario: Different project risks
WHEN documenting an existing system or consequential feature
THEN the host reads canonical sources/revisions, selects relevant architecture/API/data/concurrency/rollout sections and marks proposals/unknowns without inventing systems or duplicating decisions.

### Requirement: Stack-aware verification
#### Scenario: Vendor or platform evidence unavailable
WHEN checks use mocks, another database engine or JS-only mobile tests
THEN the host does not claim actual vendor/native behavior, uses version-aware guidance and records missing checks as NOT_RUN/BLOCKED.

### Requirement: Optional export integrity
#### Scenario: Requested editable document has no exporter or renderer
WHEN Word/PDF/slides output is requested without necessary authorized host tooling
THEN the host reports export BLOCKED or visual QA NOT_RUN, preserves the canonical source and neither auto-installs dependencies nor renames text as a binary format.

### Requirement: Compatible selective packaging
#### Scenario: Consumer installs or updates
WHEN a project selects relevant modules
THEN supporting guidance is locked and discoverable, Core-only excludes optional modules, existing IDs/user docs/config survive and edited managed assets still block update.
