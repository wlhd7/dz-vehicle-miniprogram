export enum ItemType {
  VEHICLE_KEY = 'vehicle_key',
  GAS_CARD = 'gas_card',
}

export enum ItemStatus {
  AVAILABLE = 'available',
  PICKED_UP = 'picked_up',
}

export interface Item {
  _id: string;
  identifier: string;
  type: ItemType;
  status: ItemStatus;
  currentHolderId: string | null;
  lastTransactionId: string | null;
}

export enum PasswordStatus {
  UNUSED = 'unused',
  ASSIGNED = 'assigned',
}

export interface Password {
  _id: string;
  value: string;
  status: PasswordStatus;
  createdAt: number;
}

export enum ActionType {
  PICKUP = 'pickup',
  RETURN = 'return',
}

export interface Transaction {
  _id: string;
  userId: string;
  userNickname: string;
  itemId: string;
  actionType: ActionType;
  assignedPassword: string;
  timestamp: number;
}
