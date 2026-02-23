# Feature Specification: Unmanned Vehicle Key and Gas Card Management

**Feature Branch**: `001-unmanned-key-management`  
**Created**: 2026-02-23  
**Status**: Draft  
**Input**: User description: "- Develop dz-vehicle-management-miniprogram - 微信小程序。实现用户领取车钥匙或加油卡的无人值守 - 用户使用微信扫描二维码进入小程序，然后选择车牌号或者加油卡，点击确认后获得密码锁的临时密码 - 临时密码由管理员提供 - 临时密码为一次性，使用后从密码库中删除 - 记录用户的微信名字，领取/归还的内容，时间 - 用户领取后，可以看到自己领取的内容；可以一键归还 - 领取或归还，系统必须提供一个临时密码 - 管理员用户，可以编辑，新增，删除车牌号或加油卡号，设置临时密码 - 密码库内的临时密码低于30个后，通知管理员添加临时密码"

## User Scenarios & Testing

### User Story 1 - Pickup Vehicle Key or Gas Card (Priority: P1)

As a user, I want to pick up a vehicle key or gas card by scanning a QR code and selecting the item, so that I can access the vehicle or card without needing a staff member present.

**Why this priority**: Core functionality of the unmanned service.
**Independent Test**: User can successfully scan, select an item, and receive a valid temporary password.

**Acceptance Scenarios**:

1. **Given** the user has scanned the QR code, **When** they select a vehicle plate or gas card and confirm, **Then** the system displays a temporary password and records the pickup event (name, item, time).
2. **Given** a user is picking up an item, **When** they receive a temporary password, **Then** that specific password is removed from the password pool.

---

### User Story 2 - Return Vehicle Key or Gas Card (Priority: P2)

As a user, I want to return an item I previously picked up using a "one-click return" feature, so that I can easily complete the process and receive a new temporary password for the return box/lock.

**Why this priority**: Essential part of the item lifecycle.
**Independent Test**: User sees their active pickups and can trigger a return to receive a password.

**Acceptance Scenarios**:

1. **Given** the user has an active pickup, **When** they click "Return", **Then** the system provides a new temporary password and records the return event.

---

### User Story 3 - Administrator Management (Priority: P3)

As an administrator, I want to manage the inventory and the password pool, so that the system remains operational and users have access to items.

**Why this priority**: Required for system maintenance and operation.
**Independent Test**: Admin can add a new vehicle plate and upload a batch of passwords.

**Acceptance Scenarios**:

1. **Given** the admin is logged in, **When** they add or delete a vehicle/card, **Then** the available items for users are updated immediately.
2. **Given** the password pool level, **When** the count falls below 30, **Then** the system sends a notification to the administrator.

### Edge Cases

- **Empty Password Pool**: What happens when a user tries to pick up/return an item but there are no passwords left? (Assumption: Show "Service Unavailable" and alert admin immediately).
- **Multiple Pickups**: Can a user pick up multiple items? (Assumption: Yes, they can see a list of all items currently in their possession).
- **Unauthorized Access**: How does the system identify an admin? (Assumption: Admin status is mapped to specific WeChat OpenIDs).

## Requirements

### Functional Requirements

- **FR-001**: The system MUST allow users to log in/identify via WeChat.
- **FR-002**: The system MUST store and display a list of vehicle plates and gas cards.
- **FR-003**: The system MUST maintain a pool of one-time temporary passwords.
- **FR-004**: The system MUST assign a unique password from the pool for every pickup and return action.
- **FR-005**: The system MUST delete a password from the active pool once it has been displayed to a user.
- **FR-006**: The system MUST record the user's WeChat nickname, item details, action type (pickup/return), and timestamp.
- **FR-007**: The system MUST provide an "Active Pickups" view for users to see what they currently have.
- **FR-008**: The system MUST notify the administrator via WeChat Service Message when the password pool is below 30.
- **FR-009**: Administrators MUST be able to Create, Read, Update, and Delete (CRUD) vehicle and gas card records.
- **FR-010**: Administrators MUST be able to bulk upload or manually enter temporary passwords into the pool.

### Key Entities

- **Item**: Represents a vehicle key (linked to plate number) or a gas card. (Attributes: ID, Type, Identifier/Plate, Status).
- **PasswordPool**: The collection of available temporary passwords. (Attributes: PasswordValue, CreatedAt).
- **Transaction**: Records of pickup and return events. (Attributes: UserNickname, UserID, ItemID, ActionType, PasswordAssigned, Timestamp).

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of pickup/return actions result in a recorded transaction with correct user details.
- **SC-002**: Temporary passwords are never reused; they are removed from the pool immediately upon assignment.
- **SC-003**: Admin receives a notification within 60 seconds of the password pool reaching the low threshold (<30).
- **SC-004**: Users can complete a pickup process in under 15 seconds from scanning the QR code.
