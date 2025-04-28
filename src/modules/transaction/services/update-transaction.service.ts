import { TransactionRepository } from '../repositories/transaction.repository';
import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto';
import {
  Result,
  AppError,
  NotFoundError,
  ForbiddenError,
} from '../../../shared/utils/error';

// return Result.fail(new UnauthorizedError());

interface CheckTransactionOwnerInput {
  transaction_id: string;
  user_id: string;
}

export class UpdateTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: UpdateTransactionInput,
  ): Promise<Result<UpdateTransactionInput, AppError>> {
    const result = await this.checkTransactionOwner({
      transaction_id: params.id,
      user_id: params.user_id,
    });

    if (result.isFailure()) {
      return Result.fail(result.error);
    }

    const transaction = await this.transactionRepository.update(params);

    return Result.ok(transaction);
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
