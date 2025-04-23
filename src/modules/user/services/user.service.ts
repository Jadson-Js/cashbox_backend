import { UserRepository } from '../repositories/user.repository';
import { FindUserOutput } from '../dtos/find-user.dto';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { comparePassword, hashPassword } from '../../../shared/utils/bcrypt';
import { LoginUserInput, LoginUserOutput } from '../dtos/login-user.dto';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../shared/utils/jwt';

export class UserService {
  public constructor(private userRepository: UserRepository) {}

  public async find(): Promise<FindUserOutput[] | null> {
    const users = await this.userRepository.find();
    return users;
  }

  public async signup({
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const passwordEncrypted = await hashPassword(password);
    const credentials = { email: email, password: passwordEncrypted };

    try {
      const user = await this.userRepository.create(credentials);
      const response = {
        id: user.id,
        email: user.email,
      };

      return response;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  public async login(params: LoginUserInput): Promise<LoginUserOutput | null> {
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

  public async delete(): Promise<void> {
    await this.userRepository.delete();
  }
}
