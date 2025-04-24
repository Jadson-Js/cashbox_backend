import { UserRepository } from '../repositories/user.repository';
import { comparePassword } from '../../../shared/utils/bcrypt';
import { LoginUserInput, LoginUserOutput } from '../dtos/login-user.dto';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../shared/utils/jwt';

export class LoginUserService {
  public constructor(private userRepository: UserRepository) {}

  public async execute(
    params: LoginUserInput,
  ): Promise<LoginUserOutput | null> {
    const user = await this.userRepository.findByEmail({ email: params.email });

    if (!user) return null;

    const passwordIsValid = await comparePassword({
      password: params.password,
      hashedPassword: user.password,
    });

    if (!passwordIsValid) return null;

    return {
      id: user.id,
      email: user.email,
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    };
  }
}
