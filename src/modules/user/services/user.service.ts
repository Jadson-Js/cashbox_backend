import { UserRepository } from '../repositories/user.repository';
import { FindUserOutput } from '../dtos/find-user.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';

export class UserService {
  public constructor(private userRepository: UserRepository) {}

  public async find(): Promise<FindUserOutput[] | null> {
    const users = await this.userRepository.find();
    return users;
  }

  public async create(params: CreateUserInput): Promise<CreateUserOutput> {
    const user = await this.userRepository.create(params);
    return user;
  }
}
