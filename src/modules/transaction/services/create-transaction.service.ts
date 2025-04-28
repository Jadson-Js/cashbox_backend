import { TransactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/create-transaction.dto';

export class CreateTransactionService {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    params: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    const transaction = await this.transactionRepository.create(params);

    return transaction;
  }
}
