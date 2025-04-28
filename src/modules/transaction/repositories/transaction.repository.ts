import { prisma } from '../../../shared/prisma/client';
import {
  FindTransactionByUserIdInput,
  FindTransactionByUserIdOutput,
} from '../dtos/findByUserId-transaction.dto';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/create-transaction.dto';
import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto';
/* import { DeleteTransactionInput } from '../dtos/delete-transaction.dto'; */

export interface TransactionRepository {
  findByUserId(
    params: FindTransactionByUserIdInput,
  ): Promise<FindTransactionByUserIdOutput[] | null>;
  create(params: CreateTransactionInput): Promise<CreateTransactionOutput>;
  update(params: UpdateTransactionInput): Promise<UpdateTransactionOutput>;
  //delete(params: DeleteTransactionInput): Promise<void>;
}

export class PrismaTransactionRepository implements TransactionRepository {
  public async findByUserId(
    params: FindTransactionByUserIdInput,
  ): Promise<FindTransactionByUserIdOutput[] | null> {
    const select = {
      id: true,
      amount: true,
      type: true,
      description: true,
      transaction_date: true,
      created_at: true,
      updated_at: true,
      user_id: true,
      category_id: true,
    };

    const transactions = await prisma.transaction.findMany({
      where: { user_id: params.user_id },
      select,
    });

    return transactions.map((transaction) => ({
      ...transaction,
      type: transaction.type as FindTransactionByUserIdOutput['type'],
    }));
  }

  public async create(
    params: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    const transaction = await prisma.transaction.create({
      data: params,
    });

    return {
      ...transaction,
      type: transaction.type as CreateTransactionOutput['type'],
    };
  }

  public async update(
    params: UpdateTransactionInput,
  ): Promise<UpdateTransactionOutput> {
    const transaction = await prisma.transaction.update({
      where: { id: params.id },
      data: params,
    });

    return {
      ...transaction,
      type: transaction.type as CreateTransactionOutput['type'],
    };
  }

  /* public async delete(params: DeleteTransactionInput): Promise<void> {
    await prisma.transaction.delete({
      where: { id: params.id },
    });
  } */
}
