# React Native adapter

Inspect whether the project uses Expo or bare React Native, its navigation, native modules and supported OS
versions. Follow the existing package manager and native build toolchain; do not silently migrate architectures.

## Application rules
Use accessible touch targets, labels and platform-appropriate navigation. Handle safe areas, keyboard,
orientation, offline/loading/error states and interrupted requests. Keep large lists bounded/virtualized.
Store credentials in the platform's secure credential store; ordinary async key-value storage is not for secrets.
Validate deep links and authorization server-side. Minimize permissions and explain denied-permission behavior.
Never log tokens, health data, personal identifiers or sensitive push payloads.

## Verification
Test observable component behavior, navigation, deep links, offline transitions and permission denial.
Native changes need platform build/simulator or device evidence on the affected platforms.
Record unavailable iOS/Android verification explicitly; a JavaScript test pass is not native build evidence.
OTA compatibility, signing and store deployment need their own reviewed release process.

## Capability index

Read rules/conventions.md before coding, then relevant rules/architecture.md, rules/security.md,
rules/database.md and rules/performance.md. Project conventions take precedence over adapter defaults.
Use only relevant adapter skills listed in adapter.yaml; core TDD, debugging and review remain shared.
Use harness-react-native-screen-delivery for screen/navigation/API/state slices and
harness-react-native-behavior-testing for JS/platform/device evidence. Load offline-sync or
device-permissions only when that behavior is touched; keep missing native verification explicit.
Review checks/verification.yaml before choosing commands. No check executes automatically.
