import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionInput } from '../dtos/delete-transaction.dto';
import { CheckTransactionOwnerService } from './checkOwner-transaction.service';

import { AppError } from '../../../shared/utils/error';

export class DeleteTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly checkTransactionOwnerService: CheckTransactionOwnerService,
  ) {}

  public async execute(
    params: DeleteTransactionInput,
  ): Promise<Result<void, AppError>> {
    const result = await this.checkTransactionOwnerService.execute({
      transaction_id: params.id,
      user_id: params.user_id,
    });

    if (result.err) {
      return Err(result.val);
    }

    const response = await this.transactionRepository.delete(params);
    return response;
  }
}
