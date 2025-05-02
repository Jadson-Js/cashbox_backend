import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/createTransaction.dto';

import { AppError } from '../../../shared/utils/error';

export class CreateTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: CreateTransactionInput,
  ): Promise<Result<CreateTransactionOutput, AppError>> {
    const transaction = await this.transactionRepository.create(params);

    if (transaction.err) {
      return Err(transaction.val);
    }

    return transaction;
  }
}
