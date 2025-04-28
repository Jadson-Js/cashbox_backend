import { prisma } from '../../../shared/prisma/client';
//import { FindTransactionOutput } from '../dtos/findByUserId-transaction.dto';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/create-transaction.dto';
/* import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto'; */
/* import { DeleteTransactionInput } from '../dtos/delete-transaction.dto'; */

export interface TransactionRepository {
  //find(): Promise<FindTransactionOutput[] | null>;
  create(params: CreateTransactionInput): Promise<CreateTransactionOutput>;
  //update(params: UpdateTransactionInput): Promise<UpdateTransactionOutput>;
  //delete(params: DeleteTransactionInput): Promise<void>;
}

export class PrismaTransactionRepository implements TransactionRepository {
  /* public async find(): Promise<FindTransactionOutput[] | null> {
    const select = {
      id: true,
      icon_svg: true,
      title: true,
      color: true,
      created_at: true,
      updated_at: true,
    };

    return prisma.transaction.findMany({
      select,
    });
  } */

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

  /*  public async update(
    params: UpdateTransactionInput,
  ): Promise<UpdateTransactionOutput> {
    const transaction = await prisma.transaction.update({
      where: { id: params.id },
      data: params,
    });

    return transaction;
  } */

  /* public async delete(params: DeleteTransactionInput): Promise<void> {
    await prisma.transaction.delete({
      where: { id: params.id },
    });
  } */
}
