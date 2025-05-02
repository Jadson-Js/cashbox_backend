import { Result, Err, Ok } from 'ts-results';

import { UserRepository } from '../repositories/user.repository';

import { LoginUserInput, LoginUserOutput } from '../dtos/loginUser.dto';

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

    if (user.err) {
      return Err(user.val);
    }

    if (!user.val) {
      return Err(new NotFoundError('User'));
    }

    const passwordIsValid = await comparePassword({
      password: params.password,
      hashedPassword: user.val.password,
    });

    if (!passwordIsValid) {
      return Err(new UnauthorizedError());
    }

    return Ok({
      id: user.val.id,
      email: user.val.email,
      accessToken: generateAccessToken(user.val.id),
      refreshToken: generateRefreshToken(user.val.id),
    });
  }
}
