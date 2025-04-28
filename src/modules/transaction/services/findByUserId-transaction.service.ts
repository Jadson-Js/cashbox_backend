import { TransactionRepository } from '../repositories/transaction.repository';
import {
  FindTransactionByUserIdInput,
  FindTransactionByUserIdOutput,
} from '../dtos/findByUserId-transaction.dto';

export class FindTransactionByUserIdService {
  public constructor(private categoryRepository: TransactionRepository) {}

  public async execute(
    params: FindTransactionByUserIdInput,
  ): Promise<FindTransactionByUserIdOutput[] | null> {
    const transactions = await this.categoryRepository.findByUserId(params);
    return transactions;
  }
}
