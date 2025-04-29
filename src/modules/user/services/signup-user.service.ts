import { Result, Err, Ok } from 'ts-results';

import { UserRepository } from '../repositories/user.repository';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { hashPassword } from '../../../shared/utils/bcrypt';
import { AppError } from '../../../shared/utils/error';

export class SignupUserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    email,
    password,
  }: CreateUserInput): Promise<Result<CreateUserOutput, AppError>> {
    const passwordEncrypted = await hashPassword(password);
    const credentials = { email: email, password: passwordEncrypted };

    const user = await this.userRepository.create(credentials);

    if (user.err) {
      return Err(user.val);
    }

    return Ok({ id: user.val.id, email: user.val.email });
  }
}
