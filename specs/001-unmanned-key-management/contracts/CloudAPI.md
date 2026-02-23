# Cloud Function Contracts

## `pickupItem`
- **Input**: `{ itemId: string, userNickname: string }`
- **Output**: `{ success: true, password: string } | { success: false, error: string }`
- **Behavior**: Atomically assigns password and updates item status.

## `returnItem`
- **Input**: `{ itemId: string, userNickname: string }`
- **Output**: `{ success: true, password: string } | { success: false, error: string }`
- **Behavior**: Atomically assigns password and releases item.

## `adminManageItem`
- **Input**: `{ action: 'create'|'update'|'delete', item: Partial<Item> }`
- **Auth**: Required (OpenID must be in admin list).

## `adminUploadPasswords`
- **Input**: `{ passwords: string[] }`
- **Behavior**: Bulk adds passwords to the pool.
