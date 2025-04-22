import { TransactionRepository } from '../repositories/transaction.repository';
import { FindTransactionOutput } from '../dtos/find-transaction.dto';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../dtos/create-transaction.dto';
import { CreateValidatorService } from './create-validator.service';
import { UserRepository } from '../../user/repositories/user.repository';

export class TransactionService {
  public constructor(
    private transactionRepository: TransactionRepository,
    private userRepository: UserRepository,
  ) {}

  public async find(): Promise<FindTransactionOutput[] | null> {
    const users = await this.transactionRepository.find();
    return users;
  }

  public async create(
    params: CreateTransactionInput,
  ): Promise<CreateTransactionOutput | null> {
    const {
      user_id,
      amount,
      type,
      category_id,
      description,
      transaction_date,
    } = params;

    const validator = new CreateValidatorService(this.userRepository);

    const user = await validator.userExists(user_id);

    if (!user) return null;

    const transaction = await this.transactionRepository.create({
      user_id,
      amount,
      type,
      category_id,
      description,
      transaction_date,
    });

    return { id: transaction.id };
  }
}
