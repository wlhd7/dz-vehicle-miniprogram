import { ActionType, Transaction } from './types';

export interface TransactionDatabaseProvider {
  saveTransaction(transaction: Omit<Transaction, '_id' | 'timestamp'>): Promise<{ _id: string }>;
}

export class TransactionLogger {
  constructor(private db: TransactionDatabaseProvider) {}

  async log(userId: string, userNickname: string, itemId: string, actionType: ActionType, password: string): Promise<void> {
    await this.db.saveTransaction({
      userId,
      userNickname,
      itemId,
      actionType,
      assignedPassword: password,
    });
  }
}
