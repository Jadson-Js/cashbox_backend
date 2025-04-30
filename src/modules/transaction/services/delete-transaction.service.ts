import { Result, Err, Ok } from 'ts-results';
import { AppError } from '../../../shared/utils/error';

import { TransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionInput } from '../dtos/delete-transaction.dto';
import { CheckTransactionOwnerService } from './checkOwner-transaction.service';

export class DeleteTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: DeleteTransactionInput,
  ): Promise<Result<void, AppError>> {
    const checkTransactionOwnerService = new CheckTransactionOwnerService();

    const result = await checkTransactionOwnerService.execute({
      transaction_id: params.id,
      user_id: params.user_id,
      transactionRepository: this.transactionRepository,
    });

    if (result.err) {
      return Err(result.val);
    }

    const response = await this.transactionRepository.delete(params);
    return response;
  }
}
