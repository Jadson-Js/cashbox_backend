import { prisma } from '../../../shared/prisma/client';

import { FindTransactionOutput } from '../dtos/find-transaction.dto';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/create-transaction.dto';

export interface TransactionRepository {
  find(): Promise<FindTransactionOutput[] | null>;

  create(params: CreateTransactionInput): Promise<CreateTransactionOutput>;
}

export class PrismaTransactionRepository implements TransactionRepository {
  public async find(): Promise<FindTransactionOutput[] | null> {
    const select = {
      id: true,
      user_id: true,
      amount: true,
      type: true,
      category_id: true,
      transaction_date: true,
    };

    return prisma.transaction.findMany({
      select,
    });
  }

  public async create(
    params: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    const transaction = await prisma.transaction.create({
      data: {
        user_id: params.user_id,
        amount: params.amount,
        type: params.type,
        category_id: params.category_id,
        description: params.description,
        transaction_date: params.transaction_date,
      },
    });

    return { id: transaction.id };
  }
}
