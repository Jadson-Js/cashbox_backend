import { TransactionRepository } from '../repositories/transaction.repository';
import {
  UpdateTransactionInput,
  UpdateTransactionOutput,
} from '../dtos/update-transaction.dto';

export class UpdateTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: UpdateTransactionInput,
  ): Promise<UpdateTransactionOutput> {
    const transaction = await this.transactionRepository.update(params);

    return transaction;
  }
}
