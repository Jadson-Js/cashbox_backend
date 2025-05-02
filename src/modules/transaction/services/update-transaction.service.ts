import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';
import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto';

import { CheckTransactionOwnerService } from './checkOwner-transaction.service';

import { AppError } from '../../../shared/utils/error';

export class UpdateTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly checkTransactionOwnerService: CheckTransactionOwnerService,
  ) {}

  public async execute(
    params: UpdateTransactionInput,
  ): Promise<Result<UpdateTransactionInput, AppError>> {
    const result = await this.checkTransactionOwnerService.execute({
      transaction_id: params.id,
      user_id: params.user_id,
    });

    if (result.err) {
      return Err(result.val);
    }

    const transaction = await this.transactionRepository.update(params);

    return transaction;
  }
}
