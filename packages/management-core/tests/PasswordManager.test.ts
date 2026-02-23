import { PasswordManager } from '../src/PasswordManager';

describe('PasswordManager', () => {
  it('should assign a password and update its status', async () => {
    // This will fail because PasswordManager is not yet implemented
    const mockDb = {
      findUnusedPassword: jest.fn().mockResolvedValue({ _id: '1', value: '1234' }),
      updatePasswordStatus: jest.fn().mockResolvedValue(true),
    };
    const pm = new PasswordManager(mockDb as any);
    const password = await pm.assignPassword('user1', 'item1');
    expect(password).toBe('1234');
    expect(mockDb.findUnusedPassword).toHaveBeenCalled();
    expect(mockDb.updatePasswordStatus).toHaveBeenCalledWith('1', 'assigned');
  });

  it('should throw error if no passwords available', async () => {
    const mockDb = {
      findUnusedPassword: jest.fn().mockResolvedValue(null),
    };
    const pm = new PasswordManager(mockDb as any);
    await expect(pm.assignPassword('user1', 'item1')).rejects.toThrow('No passwords available');
  });
});
