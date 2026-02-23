# Implementation Plan: Unmanned Vehicle Key and Gas Card Management

**Branch**: `001-unmanned-key-management` | **Date**: 2026-02-23 | **Spec**: `/specs/001-unmanned-key-management/spec.md`
**Input**: Feature specification for unmanned key/card management.

## Summary

Implement a WeChat Mini Program system for unmanned pickup and return of vehicle keys and gas cards. The system will use a pool of one-time temporary passwords assigned to users upon scanning a QR code and selecting an item. Administration will be handled within the same app for authorized users.

## Technical Context

**Language/Version**: TypeScript (latest stable)
**Primary Dependencies**: WeChat Mini Program SDK, WeChat Cloud Development (CloudBase)
**Storage**: WeChat Cloud Database (NoSQL)
**Testing**: Jest (Unit), WeChat DevTools (Integration/E2E)
**Target Platform**: WeChat Mini Program
**Project Type**: mobile-app + cloud-backend
**Performance Goals**: <15s end-to-end pickup flow, <1s page transitions
**Constraints**: 2MB bundle limit, WeChat environment restrictions, offline-incapable (requires network for password sync)
**Scale/Scope**: <100 vehicles/cards initially, low concurrent user volume

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Article I (Library-First)**: Core logic is encapsulated in `packages/management-core`.
- [x] **Article II (CLI Interface)**: Admin management provided via `packages/management-cli`.
- [x] **Article III (Test-First)**: TDD workflow defined for the core library.
- [x] **Article VII (Simplicity)**: 3-module structure confirmed (Core, CLI, Miniprogram).
- [x] **Article VIII (Anti-Abstraction)**: Using standard `wx.cloud` APIs.
- [x] **Article IX (Integration-First)**: Tests will target a real CloudBase development environment.

## Project Structure

### Documentation (this feature)

```text
specs/001-unmanned-key-management/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
packages/
├── management-core/     # Article I: Core logic (TS)
│   ├── src/
│   └── tests/
├── management-cli/      # Article II: CLI for admin tasks (Node.js)
│   ├── src/
│   └── tests/
miniprogram/             # WeChat Mini Program Frontend
├── pages/
├── components/
└── services/            # Calls management-core
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
