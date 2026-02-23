# Research: Unmanned Key Management Implementation

## Decision: WeChat Cloud Development (CloudBase)
**Rationale**: 
- Provides an out-of-the-box NoSQL database for the password pool and transactions.
- Cloud Functions can handle the "one-time" logic atomically (transactional updates).
- Native support for WeChat Service Messages (Template Messages).
- Integrated authentication using OpenID.

**Alternatives considered**:
- **Self-hosted Node.js + MongoDB**: Rejected due to increased devOps overhead and complexity in handling WeChat auth/notifications.

## Decision: `management-core` Library Structure
**Rationale**: 
To satisfy **Article I**, the core logic for password assignment, pool validation, and transaction logging will reside in a shared TypeScript library. This library will be used by both the Cloud Functions and the CLI tool.

## Decision: Admin Notification Method
**Rationale**: 
- **WeChat Service Messages** (Subscribe Messages) will be used.
- Trigger: Cloud Function hook on password pool update.
- Threshold: Count < 30.

## Decision: CLI Tool (Article II)
**Rationale**: 
A Node.js CLI tool will interact with the CloudBase API to allow bulk upload of passwords and manual transaction overrides. This ensures the system is observable and manageable outside the Mini Program UI.
