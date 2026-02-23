# Tasks: Unmanned Vehicle Key and Gas Card Management

**Input**: Design documents from `/specs/001-unmanned-key-management/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup

- [X] T001 Initialize `packages/management-core` with TypeScript and Jest configuration
- [X] T002 Initialize `packages/management-cli` with Node.js and basic command structure
- [X] T003 Initialize `miniprogram/` project with WeChat CloudBase configuration
- [X] T004 [P] Create WeChat Cloud Database collections: `items`, `passwords`, `transactions`

## Phase 2: Foundational (Core Library)

- [X] T005 [P] Define TypeScript interfaces for entities in `packages/management-core/src/types.ts`
- [X] T006 Write failing tests for `PasswordManager` in `packages/management-core/tests/PasswordManager.test.ts` (Article III)
- [X] T007 Implement `PasswordManager` in `packages/management-core/src/PasswordManager.ts`
- [X] T008 [P] Write failing tests for `TransactionLogger` in `packages/management-core/tests/TransactionLogger.test.ts`
- [X] T009 [P] Implement `TransactionLogger` in `packages/management-core/src/TransactionLogger.ts`
- [X] T010 [P] Write failing tests for `ItemRegistry` in `packages/management-core/tests/ItemRegistry.test.ts`
- [X] T011 [P] Implement `ItemRegistry` in `packages/management-core/src/ItemRegistry.ts`

## Phase 3: [US1] Pickup Vehicle Key or Gas Card (P1)

**Story Goal**: User can scan QR code, select an item, and receive a temporary password.
**Independent Test**: User scans, selects item, confirms, and receives a password; pool count decreases.

- [X] T012 [US1] Create Cloud Function `pickupItem` in `miniprogram/cloudfunctions/pickupItem/index.js`
- [X] T013 [US1] Implement `pickupItem` logic using `management-core` (assign password, update status, log transaction)
- [X] T014 [US1] Create Mini Program page `pages/index/index` for scanning and item selection
- [X] T015 [US1] Implement item selection UI and confirmation flow in `pages/index/index`
- [X] T016 [US1] Connect frontend to `pickupItem` Cloud Function and display assigned password

## Phase 4: [US2] Return Vehicle Key or Gas Card (P2)

**Story Goal**: User can return an item they possess and receive a password.
**Independent Test**: User clicks return on an active item and receives a password; item status becomes available.

- [X] T017 [US2] Create Cloud Function `returnItem` in `miniprogram/cloudfunctions/returnItem/index.js`
- [X] T018 [US2] Implement `returnItem` logic using `management-core` (assign password, release item, log transaction)
- [X] T019 [US2] Create "Active Pickups" view in `pages/active/active` showing items held by user
- [X] T020 [US2] Implement "One-Click Return" button and password display in `pages/active/active`

## Phase 5: [US3] Administrator Management (P3)

**Story Goal**: Admin can manage items and passwords, and receive low pool notifications.
**Independent Test**: Admin adds item/password; pool < 30 triggers a WeChat message.

- [X] T021 [US3] Implement `adminManageItem` Cloud Function for CRUD operations on items
- [X] T022 [US3] Implement `adminUploadPasswords` Cloud Function for bulk password upload
- [X] T023 [US3] [P] Implement CLI command `mgmt-cli items add/delete` in `packages/management-cli/src/items.ts`
- [X] T024 [US3] [P] Implement CLI command `mgmt-cli passwords upload` in `packages/management-cli/src/passwords.ts`
- [X] T025 [US3] Create Cloud Function `checkPoolAndNotify` triggered by password status changes
- [X] T026 [US3] Implement WeChat Service Message notification in `checkPoolAndNotify` for count < 30
- [X] T027 [US3] Create Admin Dashboard page `pages/admin/admin` in Mini Program for inventory overview

## Phase 6: Polish & Cross-Cutting

- [X] T028 Implement global loading states and error handling for all Cloud Function calls
- [X] T029 Add logging and performance markers as per Article VI
- [X] T030 Final verification of all user journeys in WeChat DevTools

## Dependencies & Parallelism

- **Foundational**: T001-T011 must be completed first.
- **US1 (Pickup)**: T012-T016 (Priority P1)
- **US2 (Return)**: T017-T020 (Depends on US1 data structures)
- **US3 (Admin)**: T021-T027 (Can be done in parallel with US1/US2)
- **Parallel Opportunities**: CLI tasks (T023, T024) can be done independently of UI tasks.

## Implementation Strategy

1. **MVP (Phase 1-3)**: Focus on the "Library-First" core logic and the primary Pickup journey.
2. **Lifecycle (Phase 4)**: Complete the item lifecycle with the Return journey.
3. **Control (Phase 5)**: Enable admin controls and the required low-pool notification system.
