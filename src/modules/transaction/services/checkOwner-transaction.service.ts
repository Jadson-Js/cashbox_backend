import { Result, Err, Ok } from 'ts-results';

import {
  AppError,
  NotFoundError,
  ForbiddenError,
} from '../../../shared/utils/error';
import { TransactionRepository } from '../repositories/transaction.repository';

interface CheckTransactionOwnerInput {
  transaction_id: string;
  user_id: string;
}

export class CheckTransactionOwnerService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: CheckTransactionOwnerInput,
  ): Promise<Result<void, AppError>> {
    const transaction = await this.transactionRepository.findById({
      id: params.transaction_id,
    });

    if (transaction.err) {
      return Err(transaction.val);
    }

    if (!transaction) {
      return Err(new NotFoundError('Transaction'));
    }

    if (transaction.val?.user_id !== params.user_id) {
      return Err(new ForbiddenError());
    }

    return Ok(undefined);
  }
}
