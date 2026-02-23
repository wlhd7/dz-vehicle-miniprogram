<!--
SYNC IMPACT REPORT
Version change: 1.1.0 → 2.0.0
Modified principles: 
- Implemented full "Nine Articles of Development" structure.
- Article I: Library-First (Strict Enforcement)
- Article II: CLI Interface (Strict Enforcement)
- Article III: Test-First Imperative (Non-negotiable TDD)
- Article VII: Simplicity (Max 3 projects gate)
- Article VIII: Anti-Abstraction (Framework Trust)
- Article IX: Integration-First Testing (Real-world environments)
Templates requiring updates: 
- .specify/templates/plan-template.md: ✅ Updated "Constitution Check" to enforce Article VII & VIII.
- .specify/templates/tasks-template.md: ✅ Updated to enforce TDD (Article III) workflow.
Follow-up TODOs: None
-->

# DZ Vehicle Miniprogram Constitution

## Core Principles: The Nine Articles of Development

### Article I: Library-First Principle
Every feature MUST begin as a standalone library—no exceptions. This forces modular design from the start. No feature shall be implemented directly within application code without first being abstracted into a reusable library component. Implementation plans MUST structure features as libraries with clear boundaries and minimal dependencies.

### Article II: CLI Interface Mandate
Every library MUST expose its functionality through a command-line interface. All CLI interfaces MUST:
- Accept text as input (via stdin, arguments, or files)
- Produce text as output (via stdout)
- Support JSON format for structured data exchange
This enforces observability and testability. No functionality shall be hidden inside opaque classes; everything MUST be accessible and verifiable through text-based interfaces.

### Article III: Test-First Imperative
This is NON-NEGOTIABLE: All implementation MUST follow strict Test-Driven Development (TDD). No implementation code shall be written before:
1. Unit tests are written.
2. Tests are validated and approved by the user.
3. Tests are confirmed to FAIL (Red phase).

### Article IV: Code Quality & Architectural Integrity
All code MUST be written in TypeScript with strict type checking enabled. Logic MUST be encapsulated in services or models within their respective libraries. Adherence to ESLint and Prettier configurations is mandatory.

### Article V: User Experience Consistency
All UI development MUST utilize the project's standard design system. Spacing, typography, and interactive feedback MUST be consistent across all pages. UI components SHOULD be abstracted as reusable libraries where they serve common patterns.

### Article VI: Performance & Observability
Performance is a feature. Page load times MUST be optimized for <1s. Bundle size MUST be managed within WeChat's 2MB limit. Libraries MUST include structured logging and performance markers to ensure runtime observability.

### Article VII: Simplicity and Minimal Structure
Maintain a minimal project structure to avoid over-engineering.
- Maximum 3 projects/modules for initial implementation.
- Additional projects require documented justification and approval.
- Every layer MUST justify its existence against the goal of simplicity.

### Article VIII: Anti-Abstraction (Framework Trust)
Use framework features directly rather than wrapping them in custom abstractions. Trust the platform (WeChat SDK) and language features. Avoid "just-in-case" wrappers that add complexity without value. Wrap only when necessary for testability or cross-platform compatibility.

### Article IX: Integration-First Testing
Prioritizes real-world testing over isolated unit tests. Tests MUST use realistic environments:
- Prefer real storage/APIs over mocks where feasible.
- Use actual service instances over stubs.
- Contract tests are MANDATORY before implementation of inter-service or inter-library features.

## Technical Constraints

- **Platform**: WeChat Mini Program (Latest stable SDK).
- **Bundle Size**: 2MB hard limit per package; utilize sub-packages for scaling.
- **Storage**: Limit local cache to 10MB; use `wx.getStorage` asynchronously.
- **Security**: All sensitive data MUST be encrypted; minimal permission sets only.

## Governance

- **Supremacy**: The Nine Articles supersede all individual preferences or legacy patterns.
- **Phase -1 Gates**: Implementation Plans MUST pass the Constitution Check (specifically Articles I, VII, and VIII) before implementation begins.
- **Amendments**: Changes require a MAJOR version bump for Article modification and a MINOR bump for clarifications.

**Version**: 2.0.0 | **Ratified**: 2026-02-23 | **Last Amended**: 2026-02-23
