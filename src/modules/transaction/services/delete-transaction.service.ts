import { TransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionInput } from '../dtos/delete-transaction.dto';
import {
  Result,
  AppError,
  NotFoundError,
  ForbiddenError,
} from '../../../shared/utils/error';

interface CheckTransactionOwnerInput {
  transaction_id: string;
  user_id: string;
}

export class DeleteTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: DeleteTransactionInput,
  ): Promise<Result<void, AppError>> {
    const result = await this.checkTransactionOwner({
      transaction_id: params.id,
      user_id: params.user_id,
    });

    if (result.isFailure()) {
      return Result.fail(result.error);
    }

    await this.transactionRepository.delete(params);

    return Result.ok(undefined);
  }

  private async checkTransactionOwner(
    params: CheckTransactionOwnerInput,
  ): Promise<Result<void, AppError>> {
    const transaction = await this.transactionRepository.findById({
      id: params.transaction_id,
    });

    if (!transaction) {
      return Result.fail(new NotFoundError('Transaction'));
    }

    if (transaction.user_id !== params.user_id) {
      return Result.fail(new ForbiddenError());
    }

    return Result.ok(undefined);
  }
}
