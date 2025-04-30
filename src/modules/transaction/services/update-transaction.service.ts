import { Result, Err, Ok } from 'ts-results';
import { AppError } from '../../../shared/utils/error';

import { TransactionRepository } from '../repositories/transaction.repository';
import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto';
import { CheckTransactionOwnerService } from './checkOwner-transaction.service';

export class UpdateTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: UpdateTransactionInput,
  ): Promise<Result<UpdateTransactionInput, AppError>> {
    const checkTransactionOwnerService = new CheckTransactionOwnerService();

    const result = await checkTransactionOwnerService.execute({
      transaction_id: params.id,
      user_id: params.user_id,
      transactionRepository: this.transactionRepository,
    });

    if (result.err) {
      return Err(result.val);
    }

    const transaction = await this.transactionRepository.update(params);

    return transaction;
  }
}
