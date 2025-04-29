import { Result, Err, Ok } from 'ts-results';

import { UserRepository } from '../repositories/user.repository';
import { LoginUserInput, LoginUserOutput } from '../dtos/login-user.dto';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../shared/utils/jwt';
import { comparePassword } from '../../../shared/utils/bcrypt';
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
} from '../../../shared/utils/error';

export class LoginUserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(
    params: LoginUserInput,
  ): Promise<Result<LoginUserOutput, AppError>> {
    const user = await this.userRepository.findByEmail({ email: params.email });

    if (!user) {
      return Err(new NotFoundError('User'));
    }

    const passwordIsValid = await comparePassword({
      password: params.password,
      hashedPassword: user.password,
    });

    if (!passwordIsValid) {
      return Err(new UnauthorizedError());
    }

    return Ok({
      id: user.id,
      email: user.email,
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    });
  }
}
