# Library API: `management-core`

The core library MUST provide a testable, framework-agnostic interface for the logic.

## `PasswordManager`
- `assignPassword(userId, itemId): Promise<string>`
- `releaseItem(userId, itemId): Promise<string>`
- `getPoolCount(): Promise<number>`

## `TransactionLogger`
- `log(userId, nickname, item, type, password): Promise<void>`

## `ItemRegistry`
- `getAllItems(): Promise<Item[]>`
- `updateStatus(itemId, status, holderId): Promise<void>`
