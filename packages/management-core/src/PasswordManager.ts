import { PasswordStatus } from './types';

export interface DatabaseProvider {
  findUnusedPassword(): Promise<{ _id: string; value: string } | null>;
  updatePasswordStatus(passwordId: string, status: PasswordStatus): Promise<void>;
  getUnusedPasswordCount(): Promise<number>;
}

export class PasswordManager {
  constructor(private db: DatabaseProvider) {}

  async assignPassword(userId: string, itemId: string): Promise<string> {
    const password = await this.db.findUnusedPassword();
    if (!password) {
      throw new Error('No passwords available');
    }

    await this.db.updatePasswordStatus(password._id, PasswordStatus.ASSIGNED);
    return password.value;
  }

  async getPoolCount(): Promise<number> {
    return await this.db.getUnusedPasswordCount();
  }
}
