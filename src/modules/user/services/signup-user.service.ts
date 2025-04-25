import { UserRepository } from '../repositories/user.repository';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { hashPassword } from '../../../shared/utils/bcrypt';

export class SignupUserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const passwordEncrypted = await hashPassword(password);
    const credentials = { email: email, password: passwordEncrypted };

    const user = await this.userRepository.create(credentials);
    const response = {
      id: user.id,
      email: user.email,
    };

    return response;
  }
}
