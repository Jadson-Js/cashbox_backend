import { TransactionRepository } from '../repositories/transaction.repository';
import { DeleteTransactionInput } from '../dtos/delete-transaction.dto';
import { CheckTransactionOwnerService } from './checkOwner-transaction.service';
import { Result, AppError } from '../../../shared/utils/error';

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

    if (result.isFailure()) {
      return result;
    }

    await this.transactionRepository.delete(params);
    return Result.ok();
  }
}
