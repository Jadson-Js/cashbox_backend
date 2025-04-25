import { UserRepository } from '../repositories/user.repository';
import { comparePassword } from '../../../shared/utils/bcrypt';
import { LoginUserInput, LoginUserOutput } from '../dtos/login-user.dto';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../shared/utils/jwt';

import {
  Result,
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
      return Result.fail(new NotFoundError('Usuário'));
    }

    const passwordIsValid = await comparePassword({
      password: params.password,
      hashedPassword: user.password,
    });

    if (!passwordIsValid) {
      return Result.fail(new UnauthorizedError());
    }

    return Result.ok({
      id: user.id,
      email: user.email,
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    });
  }
}
