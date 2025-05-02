import { Result, Err, Ok } from 'ts-results';

import { UserRepository } from '../repositories/user.repository';
import { SignupUserInput, SignupUserOutput } from '../dtos/signupUser.dto';

import { hashPassword } from '../../../shared/utils/bcrypt';
import { AppError } from '../../../shared/utils/error';

export class SignupUserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    email,
    password,
  }: SignupUserInput): Promise<Result<SignupUserOutput, AppError>> {
    const passwordEncrypted = await hashPassword(password);
    const credentials = { email: email, password: passwordEncrypted };

    const user = await this.userRepository.create(credentials);

    if (user.err) {
      return Err(user.val);
    }

    const response: SignupUserOutput = {
      id: user.val.id,
      email: user.val.email,
    };

    return Ok(response);
  }
}
