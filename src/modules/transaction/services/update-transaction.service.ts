import { TransactionRepository } from '../repositories/transaction.repository';
import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto';
import { CheckTransactionOwnerService } from './checkOwner-transaction.service';
import { Result, AppError } from '../../../shared/utils/error';

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

    if (result.isFailure()) {
      return Result.fail(result.error);
    }

    const transaction = await this.transactionRepository.update(params);

    return Result.ok(transaction);
  }
}
