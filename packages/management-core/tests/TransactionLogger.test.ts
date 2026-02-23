import { TransactionLogger } from '../src/TransactionLogger';
import { ActionType } from '../src/types';

describe('TransactionLogger', () => {
  it('should log a transaction', async () => {
    const mockDb = {
      saveTransaction: jest.fn().mockResolvedValue({ _id: 't1' }),
    };
    const logger = new TransactionLogger(mockDb as any);
    await logger.log('u1', 'nick', 'i1', ActionType.PICKUP, '1234');
    
    expect(mockDb.saveTransaction).toHaveBeenCalledWith(expect.objectContaining({
      userId: 'u1',
      userNickname: 'nick',
      itemId: 'i1',
      actionType: ActionType.PICKUP,
      assignedPassword: '1234',
    }));
  });
});
