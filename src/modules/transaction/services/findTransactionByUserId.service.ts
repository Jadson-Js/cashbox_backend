import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import {
  FindTransactionsByUserIdInput,
  FindTransactionsByUserIdOutput,
} from '../dtos/findTransactionsByUserId.dto';

import { AppError } from '../../../shared/utils/error';

export class FindTransactionsByUserIdService {
  public constructor(private categoryRepository: TransactionRepository) {}

  public async execute(
    params: FindTransactionsByUserIdInput,
  ): Promise<Result<FindTransactionsByUserIdOutput[] | null, AppError>> {
    const transactions = await this.categoryRepository.findByUserId(params);

    if (transactions.err) {
      return Err(transactions.val);
    }

    return transactions;
  }
}
