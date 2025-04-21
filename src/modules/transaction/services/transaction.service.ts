import { TransactionRepository } from '../repositories/transaction.repository';
import { FindTransactionOutput } from '../dtos/find-transaction.dto';

export class TransactionService {
  public constructor(private userRepository: TransactionRepository) {}

  public async find(): Promise<FindTransactionOutput[] | null> {
    const users = await this.userRepository.find();
    return users;
  }
}
