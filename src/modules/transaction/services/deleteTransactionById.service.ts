import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionByIdInput } from '../dtos/deleteTransactionById.dto';

import { AppError } from '../../../shared/utils/error';

export class DeleteTransactionByIdService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: DeleteTransactionByIdInput,
  ): Promise<Result<void, AppError>> {
    const result = await this.transactionRepository.delete(params);

    if (result.err) {
      return Err(result.val);
    }

    return result;
  }
}
