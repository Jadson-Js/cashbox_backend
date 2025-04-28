import { TransactionRepository } from '../repositories/transaction.repository';
import {
  FindByUserIdInput,
  FindByUserIdOutput,
} from '../dtos/findByUserId-transaction.dto';

export class FindTransactionService {
  public constructor(private categoryRepository: TransactionRepository) {}

  public async execute(
    params: FindByUserIdInput,
  ): Promise<FindByUserIdOutput[] | null> {
    const transactions = await this.categoryRepository.find(params);
    return transactions;
  }
}
