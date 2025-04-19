import { UserRepository } from '../repositories/user.repository';
import { FindUserOutput } from '../dtos/find-user.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { hashPassword } from '../../../shared/utils/bcrypt';

export class UserService {
  public constructor(private userRepository: UserRepository) {}

  public async find(): Promise<FindUserOutput[] | null> {
    const users = await this.userRepository.find();
    return users;
  }

  public async create(params: CreateUserInput): Promise<CreateUserOutput> {
    const passwordEncrypted = await hashPassword(params.password);
    const data = { email: params.email, password: passwordEncrypted };

    const user = await this.userRepository.create(data);

    return user;
  }
}
