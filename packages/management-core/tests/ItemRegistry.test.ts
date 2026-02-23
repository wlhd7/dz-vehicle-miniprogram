import { ItemRegistry } from '../src/ItemRegistry';
import { ItemStatus, ItemType } from '../src/types';

describe('ItemRegistry', () => {
  it('should get all items', async () => {
    const mockDb = {
      findAllItems: jest.fn().mockResolvedValue([{ _id: '1', identifier: 'A1', type: ItemType.VEHICLE_KEY, status: ItemStatus.AVAILABLE }]),
    };
    const registry = new ItemRegistry(mockDb as any);
    const items = await registry.getAllItems();
    expect(items).toHaveLength(1);
    expect(items[0].identifier).toBe('A1');
  });

  it('should update item status', async () => {
    const mockDb = {
      updateItemStatus: jest.fn().mockResolvedValue(true),
    };
    const registry = new ItemRegistry(mockDb as any);
    await registry.updateStatus('1', ItemStatus.PICKED_UP, 'u1');
    expect(mockDb.updateItemStatus).toHaveBeenCalledWith('1', ItemStatus.PICKED_UP, 'u1');
  });
});
