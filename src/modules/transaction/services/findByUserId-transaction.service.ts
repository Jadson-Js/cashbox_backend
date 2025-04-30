import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import {
  FindTransactionByUserIdInput,
  FindTransactionByUserIdOutput,
} from '../dtos/findByUserId-transaction.dto';

import { AppError } from '../../../shared/utils/error';

export class FindTransactionByUserIdService {
  public constructor(private categoryRepository: TransactionRepository) {}

  public async execute(
    params: FindTransactionByUserIdInput,
  ): Promise<Result<FindTransactionByUserIdOutput[] | null, AppError>> {
    const transactions = await this.categoryRepository.findByUserId(params);

    if (transactions.err) {
      return Err(transactions.val);
    }

    return transactions;
  }
}
