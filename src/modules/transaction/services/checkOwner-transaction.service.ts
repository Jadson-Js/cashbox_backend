import { TransactionRepository } from '../repositories/transaction.repository';
import {
  Result,
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

    if (!transaction) {
      return Result.fail(new NotFoundError('Transaction'));
    }

    if (transaction.user_id !== params.user_id) {
      return Result.fail(new ForbiddenError());
    }
    return Result.ok();
  }
}
