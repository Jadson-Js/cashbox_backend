import { Result, Err, Ok } from 'ts-results';

import { prisma } from '../../../shared/prisma/client';
import {
  FindTransactionByIdInput,
  FindTransactionByIdOutput,
} from '../dtos/findById-transaction.dto';
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
import { DeleteTransactionInput } from '../dtos/delete-transaction.dto';

import {
  AppError,
  InternalServerError,
  NotFoundError,
} from '../../../shared/utils/error';

export interface TransactionRepository {
  findById(
    params: FindTransactionByIdInput,
  ): Promise<Result<FindTransactionByIdOutput | null, AppError>>;
  findByUserId(
    params: FindTransactionByUserIdInput,
  ): Promise<Result<FindTransactionByUserIdOutput[] | null, AppError>>;
  create(
    params: CreateTransactionInput,
  ): Promise<Result<CreateTransactionOutput, AppError>>;
  update(
    params: UpdateTransactionInput,
  ): Promise<Result<UpdateTransactionOutput, AppError>>;
  delete(params: DeleteTransactionInput): Promise<Result<void, AppError>>;
}

export class PrismaTransactionRepository implements TransactionRepository {
  public async findById(
    params: FindTransactionByIdInput,
  ): Promise<Result<FindTransactionByIdOutput | null, AppError>> {
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
    try {
      const transaction = await prisma.transaction.findFirst({
        where: { id: params.id },
        select,
      });

      if (!transaction) {
        return Err(new NotFoundError('Transaction'));
      }

      return Ok({
        ...transaction,
        type: transaction.type as FindTransactionByIdOutput['type'],
      });
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async findByUserId(
    params: FindTransactionByUserIdInput,
  ): Promise<Result<FindTransactionByUserIdOutput[] | null, AppError>> {
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

    try {
      const transactions = await prisma.transaction.findMany({
        where: { user_id: params.user_id },
        select,
      });

      return Ok(
        transactions.map((transaction) => ({
          ...transaction,
          type: transaction.type as FindTransactionByUserIdOutput['type'],
        })),
      );
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async create(
    params: CreateTransactionInput,
  ): Promise<Result<CreateTransactionOutput, AppError>> {
    const input = {
      amount: params.amount,
      type: params.type,
      description: params.description,
      transaction_date: params.transaction_date,
      category_id: params.category_id,
      user_id: params.user_id,
    };
    try {
      const transaction = await prisma.transaction.create({
        data: input,
      });

      return Ok({
        ...transaction,
        type: transaction.type as CreateTransactionOutput['type'],
      });
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async update(
    params: UpdateTransactionInput,
  ): Promise<Result<UpdateTransactionOutput, AppError>> {
    const input = {
      amount: params.amount,
      type: params.type,
      description: params.description,
      transaction_date: params.transaction_date,
      category_id: params.category_id,
    };
    try {
      const transaction = await prisma.transaction.update({
        where: { id: params.id },
        data: input,
      });

      return Ok({
        ...transaction,
        type: transaction.type as UpdateTransactionOutput['type'],
      });
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }

  public async delete(
    params: DeleteTransactionInput,
  ): Promise<Result<void, AppError>> {
    try {
      await prisma.transaction.delete({
        where: { id: params.id },
      });

      return Ok(undefined);
    } catch (err: unknown) {
      console.log(err);
      return Err(new InternalServerError());
    }
  }
}
