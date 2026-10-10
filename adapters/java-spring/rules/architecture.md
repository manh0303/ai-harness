# Architecture

Read the actual JDK, Spring BOM, module boundaries and Maven/Gradle wrapper. Use constructor injection. Keep transport validation, application transactions and persistence concerns separate according to the existing project. Do not mandate microservices. For Modulith, call public module APIs and test module dependencies. Preserve HTTP contracts and explicit error representations.
