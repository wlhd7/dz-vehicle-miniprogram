import { Item, ItemStatus } from './types';

export interface ItemDatabaseProvider {
  findAllItems(): Promise<Item[]>;
  updateItemStatus(itemId: string, status: ItemStatus, holderId: string | null): Promise<void>;
}

export class ItemRegistry {
  constructor(private db: ItemDatabaseProvider) {}

  async getAllItems(): Promise<Item[]> {
    return await this.db.findAllItems();
  }

  async updateStatus(itemId: string, status: ItemStatus, holderId: string | null): Promise<void> {
    await this.db.updateItemStatus(itemId, status, holderId);
  }
}
