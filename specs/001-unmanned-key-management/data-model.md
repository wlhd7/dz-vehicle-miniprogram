# Data Model: Unmanned Key Management

## Entities

### Item (Collection: `items`)
Represents a vehicle key or gas card.
- `_id`: UUID
- `identifier`: String (e.g., Plate Number "沪A88888" or Card ID)
- `type`: String (Enum: `vehicle_key`, `gas_card`)
- `status`: String (Enum: `available`, `picked_up`)
- `currentHolderId`: String (OpenID of user, null if available)
- `lastTransactionId`: String (Link to transactions collection)

### Password (Collection: `passwords`)
One-time temporary passwords provided by the admin.
- `_id`: UUID
- `value`: String (The password code)
- `status`: String (Enum: `unused`, `assigned`)
- `createdAt`: Timestamp

### Transaction (Collection: `transactions`)
Audit log of all actions.
- `_id`: UUID
- `userId`: String (OpenID)
- `userNickname`: String
- `itemId`: String (Link to items)
- `actionType`: String (Enum: `pickup`, `return`)
- `assignedPassword`: String
- `timestamp`: Timestamp

## State Transitions

### Pickup Flow
1. User selects `Item` (status: `available`).
2. Atomic Transaction:
   - Find one `Password` where `status == 'unused'`.
   - Update `Password` status to `assigned`.
   - Update `Item` status to `picked_up` and set `currentHolderId`.
   - Create `Transaction` record.
3. If password count < 30, trigger Notification Cloud Function.

### Return Flow
1. User selects active pickup from `Item` list (where `currentHolderId == OpenID`).
2. Atomic Transaction:
   - Find one `Password` where `status == 'unused'`.
   - Update `Password` status to `assigned`.
   - Update `Item` status to `available` and clear `currentHolderId`.
   - Create `Transaction` record.
