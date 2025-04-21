import { prisma } from '../../../shared/prisma/client';
import { FindTransactionOutput } from '../dtos/find-transaction.dto';

export interface TransactionRepository {
  find(): Promise<FindTransactionOutput[] | null>;
}

export class PrismaTransactionRepository implements TransactionRepository {
  public async find(): Promise<FindTransactionOutput[] | null> {
    const select = {
      id: true,
      user_id: true,
      amount: true,
      type: true,
      category: true,
      transaction_date: true,
    };

    return prisma.transaction.findMany({
      select,
    });
  }
}
