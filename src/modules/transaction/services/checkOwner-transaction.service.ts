import { Result, Err, Ok } from 'ts-results';

import { TransactionRepository } from '../repositories/transaction.repository';

import {
  AppError,
  NotFoundError,
  ForbiddenError,
} from '../../../shared/utils/error';

interface CheckTransactionOwnerInput {
  transaction_id: string;
  user_id: string;
  transactionRepository: TransactionRepository;
}

export class CheckTransactionOwnerService {
  public async execute(
    params: CheckTransactionOwnerInput,
  ): Promise<Result<void, AppError>> {
    const transaction = await params.transactionRepository.findById({
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
