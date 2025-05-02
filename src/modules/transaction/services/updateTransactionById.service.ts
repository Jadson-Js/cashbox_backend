import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import {
  UpdateTransactionByIdInput,
  UpdateTransactionByIdOutput,
} from '../dtos/updateTransactionById.dto';

import { AppError } from '../../../shared/utils/error';

export class UpdateTransactionByIdService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: UpdateTransactionByIdInput,
  ): Promise<Result<UpdateTransactionByIdOutput, AppError>> {
    const transaction = await this.transactionRepository.update(params);

    if (transaction.err) {
      return Err(transaction.val);
    }

    return transaction;
  }
}
